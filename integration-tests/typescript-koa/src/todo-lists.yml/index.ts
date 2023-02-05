/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import {
  t_DeleteTodoListByIdParamSchema,
  t_GetTodoListByIdParamSchema,
  t_GetTodoListsQuerySchema,
  t_UpdateTodoListByIdBodySchema,
  t_UpdateTodoListByIdParamSchema,
} from "./models"
import cors from "@koa/cors"
import KoaRouter from "@koa/router"
import Koa, { Context, Middleware, Next } from "koa"
import koaBody from "koa-body"
import { ZodSchema, z } from "zod"

//region safe-edit-region-header
//endregion safe-edit-region-header

function paramValidationFactory<Type>(
  schema: ZodSchema
): Middleware<{ params: Type }> {
  return async function (ctx: Context, next: Next) {
    const result = schema.safeParse(ctx.params)
    console.info(result)

    if (!result.success) {
      throw new Error("validation error")
    }

    ctx.state.params = result.data

    return next()
  }
}

function queryValidationFactory<Type>(
  schema: ZodSchema
): Middleware<{ query: Type }> {
  return async function (ctx: Context, next: Next) {
    const result = schema.safeParse(ctx.query)
    console.info(result)

    if (!result.success) {
      throw new Error("validation error")
    }

    ctx.state.query = result.data

    return next()
  }
}

function bodyValidationFactory<Type>(
  schema: ZodSchema
): Middleware<{ body: Type }> {
  return async function (ctx: Context, next: Next) {
    const result = schema.safeParse(ctx.request.body)
    console.info(result)

    if (!result.success) {
      throw new Error("validation error")
    }

    ctx.state.body = result.data

    return next()
  }
}

interface ValidatedCtx<Params, Query, Body> extends Context {
  state: { params: Params; query: Query; body: Body }
}

const PORT = 3000

// ApiClient
const server = new Koa()

server.use(cors())
server.use(koaBody())

const router = new KoaRouter()

const getTodoListsQuerySchema = z.object({
  created: z.coerce.string().datetime({ offset: true }).optional(),
  status: z.enum(["incomplete", "complete"]).optional(),
})

router.get(
  "getTodoLists",
  "/list",
  queryValidationFactory<t_GetTodoListsQuerySchema>(getTodoListsQuerySchema),
  async (
    ctx: ValidatedCtx<void, t_GetTodoListsQuerySchema, void>,
    next: Next
  ) => {
    //region safe-edit-region-getTodoLists

    ctx.status = 501
    ctx.body = { error: "not implemented" }
    return next()

    //endregion safe-edit-region-getTodoLists
  }
)

const getTodoListByIdParamSchema = z.object({ listId: z.coerce.string() })

router.get(
  "getTodoListById",
  "/list/:listId",
  paramValidationFactory<t_GetTodoListByIdParamSchema>(
    getTodoListByIdParamSchema
  ),
  async (
    ctx: ValidatedCtx<t_GetTodoListByIdParamSchema, void, void>,
    next: Next
  ) => {
    //region safe-edit-region-getTodoListById

    ctx.status = 501
    ctx.body = { error: "not implemented" }
    return next()

    //endregion safe-edit-region-getTodoListById
  }
)

const updateTodoListByIdParamSchema = z.object({ listId: z.coerce.string() })

const updateTodoListByIdBodySchema = z.object({ name: z.coerce.string() })

router.put(
  "updateTodoListById",
  "/list/:listId",
  paramValidationFactory<t_UpdateTodoListByIdParamSchema>(
    updateTodoListByIdParamSchema
  ),
  bodyValidationFactory<t_UpdateTodoListByIdBodySchema>(
    updateTodoListByIdBodySchema
  ),
  async (
    ctx: ValidatedCtx<
      t_UpdateTodoListByIdParamSchema,
      void,
      t_UpdateTodoListByIdBodySchema
    >,
    next: Next
  ) => {
    //region safe-edit-region-updateTodoListById

    ctx.status = 501
    ctx.body = { error: "not implemented" }
    return next()

    //endregion safe-edit-region-updateTodoListById
  }
)

const deleteTodoListByIdParamSchema = z.object({ listId: z.coerce.string() })

router.delete(
  "deleteTodoListById",
  "/list/:listId",
  paramValidationFactory<t_DeleteTodoListByIdParamSchema>(
    deleteTodoListByIdParamSchema
  ),
  async (
    ctx: ValidatedCtx<t_DeleteTodoListByIdParamSchema, void, void>,
    next: Next
  ) => {
    //region safe-edit-region-deleteTodoListById

    ctx.status = 501
    ctx.body = { error: "not implemented" }
    return next()

    //endregion safe-edit-region-deleteTodoListById
  }
)

server.use(router.allowedMethods())
server.use(router.routes())

server.listen(PORT, () => {
  console.info("server listening", { port: PORT })
})
