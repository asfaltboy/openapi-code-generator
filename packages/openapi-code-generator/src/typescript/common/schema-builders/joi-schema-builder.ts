/**
 * @prettier
 */

import {Input} from "../../../core/input"
import {
  IRModelNumeric,
  IRModelString,
} from "../../../core/openapi-types-normalized"
import {isDefined} from "../../../core/utils"
import {AbstractSchemaBuilder} from "./abstract-schema-builder"
import {ImportBuilder} from "../import-builder"
import {Reference} from "../../../core/openapi-types"
import {getSchemaNameFromRef} from "../../../core/openapi-utils"
import {ExportDefinition} from "../typescript-common"

enum JoiFn {
  Object = "object()",
  Array = "array()",
  Number = "number()",
  String = "string()",
  Boolean = "boolean()",
  Required = "required()",
}

export class JoiBuilder extends AbstractSchemaBuilder {
  constructor(
    private readonly joi = "joi",
    filename: string,
    input: Input,
    imports: ImportBuilder,
  ) {
    super(filename, input, imports)

    this.importHelpers(imports)

    imports
      .from("@nahkies/typescript-koa-runtime/joi")
      .add("parseRequestInput", "Params", "responseValidationFactory")
  }

  protected importHelpers(imports: ImportBuilder) {
    imports.addModule(this.joi, "@hapi/joi")
  }

  public any(): string {
    return [this.joi, "any()"].filter(isDefined).join(".")
  }

  public void(): string {
    return [this.joi, "any()", "valid(undefined)"].filter(isDefined).join(".")
  }

  protected schemaFromRef(
    reference: Reference,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    imports: ImportBuilder,
  ): ExportDefinition {
    const name = getSchemaNameFromRef(reference)
    const schemaObject = this.input.schema(reference)

    const value = this.fromModel(schemaObject, true)

    return {
      name,
      type: "",
      value: value + `.id("${name}")`,
      kind: "const",
    }
  }

  protected lazy(schema: string): string {
    return [this.joi, `link('#${schema}')`].join(".")
  }

  protected intersect(schemas: string[]): string {
    return schemas.filter(isDefined).reduce((acc, it) => {
      return `${acc}\n.concat(${it})`
    })
  }

  protected union(schemas: string[]): string {
    return [
      this.joi,
      `alternatives().try(${schemas
        .filter(isDefined)
        .map((it) => it)
        .join(",")})`,
    ]
      .filter(isDefined)
      .join(".")
  }

  protected nullable(schema: string): string {
    return [schema, "allow(null)"].join(".")
  }

  protected object(keys: Record<string, string>, required: boolean): string {
    return [
      this.joi,
      JoiFn.Object,
      `keys({${Object.entries(keys)
        .map(([key, value]) => `"${key}": ${value}`)
        .join(",")} })`,
      required ? JoiFn.Required : undefined,
    ]
      .filter(isDefined)
      .join(".")
  }

  protected array(items: string[], required: boolean): string {
    return [
      this.joi,
      JoiFn.Array,
      `items(${items.join(",")})`,
      required ? JoiFn.Required : undefined,
    ]
      .filter(isDefined)
      .join(".")
  }

  protected number(model: IRModelNumeric, required: boolean) {
    // todo: enum support

    return [this.joi, JoiFn.Number, required ? JoiFn.Required : undefined]
      .filter(isDefined)
      .join(".")
  }

  protected string(model: IRModelString, required: boolean) {
    // todo: enum support

    return [this.joi, JoiFn.String, required ? JoiFn.Required : undefined]
      .filter(isDefined)
      .join(".")
  }

  protected boolean(required: boolean) {
    return [this.joi, JoiFn.Boolean, required ? JoiFn.Required : undefined]
      .filter(isDefined)
      .join(".")
  }
}
