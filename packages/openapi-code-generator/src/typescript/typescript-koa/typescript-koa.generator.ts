import _ from "lodash"
import {Input} from "../../core/input"
import {IRModelObject, IROperation, IRParameter} from "../../core/openapi-types-normalized"
import {ImportBuilder} from "../common/import-builder"
import {emitGenerationResult, loadPreviousResult} from "../common/output-utils"
import {TypeBuilder} from "../common/type-builder"
import {isDefined, titleCase} from "../../core/utils"
import {SchemaBuilder, schemaBuilderFactory} from "../common/schema-builders/schema-builder"
import {buildExport, requestBodyAsParameter, statusStringToType} from "../common/typescript-common"
import {OpenapiGeneratorConfig} from "../../templates.types"
import {intersect, object} from "../common/type-utils"
import {ZodBuilder} from "../common/schema-builders/zod-schema-builder"
import {JoiBuilder} from "../common/schema-builders/joi-schema-builder"

function reduceParamsToOpenApiSchema(parameters: IRParameter[]): IRModelObject {
  return parameters.reduce((acc, parameter) => {
    acc.properties[parameter.name] = parameter.schema

    if (parameter.required) {
      acc.required.push(parameter.name)
    }

    return acc
  }, {
    type: "object",
    properties: {},
    required: [],
    oneOf: [],
    allOf: [],
    anyOf: [],
    additionalProperties: false,
    nullable: false,
    readOnly: false,
  } as IRModelObject)
}

export class ServerBuilder {
  private readonly statements: string[] = []
  private readonly operationTypes: {
    operationId: string,
    statements: string[]
  }[] = []

  constructor(
    public readonly filename: string,
    private readonly name: string,
    private readonly input: Input,
    private readonly imports: ImportBuilder,
    public readonly types: TypeBuilder,
    public readonly schemaBuilder: SchemaBuilder,
    private existingRegions: {
      [operationId: string]: string
    },
  ) {
    // todo: unsure why, but adding an export at `.` of index.ts doesn't work properly
    this.imports.from("@nahkies/typescript-koa-runtime/server")
      .add(
        "startServer",
        "ServerConfig",
        "Response",
        "KoaRuntimeResponse",
        "KoaRuntimeResponder",
        "StatusCode2xx",
        "StatusCode3xx",
        "StatusCode4xx",
        "StatusCode5xx",
        "StatusCode",
      )

    this.imports.from("@nahkies/typescript-koa-runtime/errors")
      .add(
        "KoaRuntimeError",
        "RequestInputType",
      )

    this.imports.from("koa")
      .add("Context")

    this.imports.addModule("KoaRouter", "@koa/router")
    this.imports.addModule("koaBody", "koa-body")

    if (schemaBuilder instanceof ZodBuilder) {
      imports
        .from("@nahkies/typescript-koa-runtime/zod")
        .add("parseRequestInput", "Params", "responseValidationFactory")
    } else if (schemaBuilder instanceof JoiBuilder) {
      imports
        .from("@nahkies/typescript-koa-runtime/joi")
        .add("parseRequestInput", "Params", "responseValidationFactory")
    }
  }

  add(operation: IROperation): void {
    const types = this.types
    const schemaBuilder = this.schemaBuilder

    const pathParams = operation.parameters.filter(it => it.in === "path")
    const paramSchema = pathParams.length ? schemaBuilder.fromParameters(pathParams) : undefined
    let pathParamsType = "void"

    const queryParams = operation.parameters.filter(it => it.in === "query")
    const querySchema = queryParams.length ? schemaBuilder.fromParameters(queryParams) : undefined
    let queryParamsType = "void"

    const {requestBodyParameter} = requestBodyAsParameter(operation)
    const bodyParamIsRequired = Boolean(requestBodyParameter?.required)
    const bodyParamSchema = requestBodyParameter ? schemaBuilder.fromModel(requestBodyParameter.schema, requestBodyParameter.required, true) : undefined
    let bodyParamsType = "void"

    if (paramSchema) {
      const name = `${operation.operationId}ParamSchema`
      pathParamsType = types.schemaObjectToType({$ref: this.input.loader.addVirtualType(operation.operationId, _.upperFirst(name), reduceParamsToOpenApiSchema(pathParams))})
      this.statements.push(`const ${name} = ${paramSchema.toString()}`)
    }

    if (querySchema) {
      const name = `${operation.operationId}QuerySchema`
      queryParamsType = types.schemaObjectToType({
        $ref: this.input.loader.addVirtualType(operation.operationId, _.upperFirst(name), reduceParamsToOpenApiSchema(queryParams)),
      })
      this.statements.push(`const ${name} = ${querySchema.toString()}`)
    }

    if (bodyParamSchema && requestBodyParameter) {
      const name = `${operation.operationId}BodySchema`
      bodyParamsType = types.schemaObjectToType({
        $ref: this.input.loader.addVirtualType(operation.operationId, _.upperFirst(name), this.input.schema(requestBodyParameter.schema)),
      })
      this.statements.push(`const ${name} = ${bodyParamSchema}`)
    }

    const responseSchemas = Object.entries(operation.responses ?? {}).reduce((acc, [status, response]) => {
      const content = Object.values(response.content ?? {}).pop()

      if (status === "default") {
        acc.defaultResponse = {
          schema: content ? schemaBuilder.fromModel(content.schema, true, true) : schemaBuilder.void(),
          type: content ? types.schemaObjectToType(content.schema) : "void",
        }
      } else {
        acc.specific.push({
          statusString: status,
          statusType: statusStringToType(status),
          type: content ? types.schemaObjectToType(content.schema) : "void",
          schema: content ? schemaBuilder.fromModel(content.schema, true, true) : schemaBuilder.void(),
          isWildCard: /^\d[xX]{2}$/.test(status),
        })
      }

      return acc
    }, {specific: [], defaultResponse: undefined} as {
      specific: {
        statusString: string,
        statusType: string,
        schema: string,
        type: string,
        isWildCard: boolean,
      }[],
      defaultResponse?: {
        type: string,
        schema: string
      }
    })

    this.operationTypes.push({
      operationId: operation.operationId,
      statements: [
        buildExport({
          name: titleCase(operation.operationId) + "Responder",
          value: intersect(object([
              ...responseSchemas.specific.map(it => it.isWildCard ?
                `with${it.statusType}(status: ${it.statusType}): KoaRuntimeResponse<${it.type}>`
                : `with${it.statusType}(): KoaRuntimeResponse<${it.type}>`),
              responseSchemas.defaultResponse && `withDefault(status: StatusCode): KoaRuntimeResponse<${responseSchemas.defaultResponse.type}>`,
            ],
          ), "KoaRuntimeResponder"),
          kind: "type",
        }),
        buildExport({
          name: titleCase(operation.operationId),
          value: `(
                    params: Params<${pathParamsType}, ${queryParamsType}, ${bodyParamsType + (bodyParamsType === "void" || bodyParamIsRequired ? "" : " | undefined")}>,
                    respond: ${titleCase(operation.operationId) + "Responder"},
                    ctx: Context
                  ) => Promise<KoaRuntimeResponse<unknown> | ${[
            ...responseSchemas.specific.map(it => `Response<${it.statusType}, ${it.type}>`),
            responseSchemas.defaultResponse && `Response<StatusCode, ${responseSchemas.defaultResponse.type}>`,
          ]
            .filter(isDefined).join(" | ")
          }>`,
          kind: "type",
        }),
      ],
    })

    this.statements.push([
      `const ${operation.operationId}ResponseValidator = responseValidationFactory([${
        responseSchemas.specific.map(it => `["${it.statusString}", ${it.schema}]`)}
      ], ${responseSchemas.defaultResponse?.schema})`,
      "",
      `router.${operation.method.toLowerCase()}('${operation.operationId}','${route(operation.route)}',`,
      `async (ctx, next) => {

       const input = {
        params: ${paramSchema ? `parseRequestInput(${operation.operationId}ParamSchema, ctx.params, RequestInputType.RouteParam)` : "undefined"},
        query: ${querySchema ? `parseRequestInput(${operation.operationId}QuerySchema, ctx.query, RequestInputType.QueryString)` : "undefined"},
        body: ${bodyParamSchema ? `parseRequestInput(${operation.operationId}BodySchema, ctx.request.body, RequestInputType.RequestBody)` : "undefined"},
       }

      const responder = {${
        [
          ...responseSchemas.specific.map(it => it.isWildCard ?
            `with${it.statusType}(status: ${it.statusType}) {return new KoaRuntimeResponse<${it.type}>(status) }`
            : `with${it.statusType}() {return new KoaRuntimeResponse<${it.type}>(${it.statusType}) }`),
          responseSchemas.defaultResponse && `withDefault(status: StatusCode) { return new KoaRuntimeResponse<${responseSchemas.defaultResponse.type}>(status) }`,
          "withStatus(status: StatusCode) { return new KoaRuntimeResponse(status)}",
        ].filter(Boolean).join(",\n")
      }}

      const response = await implementation.${operation.operationId}(input, responder, ctx)
        .catch(err => { throw KoaRuntimeError.HandlerError(err) })


      const {
        status,
        body,
      } = response instanceof KoaRuntimeResponse ? response.unpack() : response

        ctx.body = ${operation.operationId}ResponseValidator(status, body)
        ctx.status = status
        return next();
      })`,
    ].filter(isDefined).join("\n"))
  }

  toString(): string {
    const clientName = this.name
    const routes = this.statements
    const imports = this.imports

    return `
${imports.toString()}

//region safe-edit-region-header
${this.existingRegions["header"] ?? ""}
//endregion safe-edit-region-header
${this.operationTypes.flatMap(it => it.statements).join("\n\n")}

${buildExport({
      name: "Implementation",
      value: object(
        this.operationTypes
          .map(it => it.operationId)
          .map((key) => `${key}: ${titleCase(key)}`)
          .join(","),
      ),
      kind: "type",
    })}

export function createRouter(implementation: Implementation): KoaRouter {
  const router = new KoaRouter()

  ${routes.join("\n\n")}

  return router
}

export async function bootstrap(config: ServerConfig) {
  // ${clientName}
  return startServer(config)
}
`
  }
}

function route(route: string): string {
  const placeholder = /{([^{}]+)}/g

  return Array.from(route.matchAll(placeholder))
    .reduce((result, match) => {
      return result.replace(match[0], ":" + match[1])
    }, route)
}

export async function generateTypescriptKoa(config: OpenapiGeneratorConfig): Promise<void> {
  const input = config.input
  const imports = new ImportBuilder()
  const types = TypeBuilder.fromInput("./models.ts", input).withImports(imports)
  const schemaBuilder = schemaBuilderFactory(config.schemaBuilder, input, imports)

  const server = new ServerBuilder(
    "generated.ts",
    "ApiClient",
    input,
    imports,
    types,
    schemaBuilder,
    loadExistingImplementations(await loadPreviousResult(config.dest, {filename: "index.ts"})),
  )

  input.allOperations()
    .map(it => server.add(it))

  await emitGenerationResult(config.dest, [
    types,
    server,
    schemaBuilder,
  ])
}

const regionBoundary = /.+safe-edit-region-(.+)/

function loadExistingImplementations(data: string): Record<string, string> {
  const result: Record<string, string> = {}

  let safeRegionName = ""
  let buffer = []

  for (const line of data.split("\n")) {

    const match = regionBoundary.exec(line)

    if (match) {

      if (safeRegionName) {
        result[safeRegionName] = buffer.join("\n")
        buffer = []
        safeRegionName = ""
      } else {
        // this is safe because we tested that the regex matched prior to
        safeRegionName = match[1]
      }
    } else if (safeRegionName) {
      buffer.push(line)
    }
  }

  return result
}
