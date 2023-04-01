/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import {
  t_AddPetBodySchema,
  t_DeletePetParamSchema,
  t_FindPetByIdParamSchema,
  t_FindPetsQuerySchema,
} from "./models"
import cors from "@koa/cors"
import KoaRouter from "@koa/router"
import {
  bodyValidationFactory,
  paramValidationFactory,
  queryValidationFactory,
} from "@nahkies/typescript-koa-runtime/zod"
import Koa, { Context, Middleware, Next } from "koa"
import koaBody from "koa-body"
import { ZodSchema, z } from "zod"

//region safe-edit-region-header
//endregion safe-edit-region-header

type Params<Params, Query, Body> = { params: Params; query: Query; body: Body }

interface ValidatedCtx<Params, Query, Body> extends Context {
  state: { params: Params; query: Query; body: Body }
}

export type FindPets = (
  params: Params<void, t_FindPetsQuerySchema, void>,
  ctx: Context
) => Promise<{ status: number; body: any }>

export type AddPet = (
  params: Params<void, void, t_AddPetBodySchema>,
  ctx: Context
) => Promise<{ status: number; body: any }>

export type FindPetById = (
  params: Params<t_FindPetByIdParamSchema, void, void>,
  ctx: Context
) => Promise<{ status: number; body: any }>

export type DeletePet = (
  params: Params<t_DeletePetParamSchema, void, void>,
  ctx: Context
) => Promise<{ status: number; body: any }>

export type Implementation = {
  findPets: FindPets
  addPet: AddPet
  findPetById: FindPetById
  deletePet: DeletePet
}

export function bootstrap(
  implementation: Implementation,
  configuration: { port: number }
) {
  // ApiClient
  const server = new Koa()

  server.use(cors())
  server.use(koaBody())

  const router = new KoaRouter()

  const findPetsQuerySchema = z.object({
    tags: z.array(z.coerce.string().optional()).optional(),
    limit: z.coerce.number().optional(),
  })

  router.get(
    "findPets",
    "/pets",
    queryValidationFactory<t_FindPetsQuerySchema>(findPetsQuerySchema),
    async (
      ctx: ValidatedCtx<void, t_FindPetsQuerySchema, void>,
      next: Next
    ) => {
      const { status, body } = await implementation.findPets(ctx.state, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  const addPetBodySchema = z.object({
    name: z.coerce.string(),
    tag: z.coerce.string().optional(),
  })

  router.post(
    "addPet",
    "/pets",
    bodyValidationFactory<t_AddPetBodySchema>(addPetBodySchema),
    async (ctx: ValidatedCtx<void, void, t_AddPetBodySchema>, next: Next) => {
      const { status, body } = await implementation.addPet(ctx.state, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  const findPetByIdParamSchema = z.object({ id: z.coerce.number() })

  router.get(
    "findPetById",
    "/pets/:id",
    paramValidationFactory<t_FindPetByIdParamSchema>(findPetByIdParamSchema),
    async (
      ctx: ValidatedCtx<t_FindPetByIdParamSchema, void, void>,
      next: Next
    ) => {
      const { status, body } = await implementation.findPetById(ctx.state, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  const deletePetParamSchema = z.object({ id: z.coerce.number() })

  router.delete(
    "deletePet",
    "/pets/:id",
    paramValidationFactory<t_DeletePetParamSchema>(deletePetParamSchema),
    async (
      ctx: ValidatedCtx<t_DeletePetParamSchema, void, void>,
      next: Next
    ) => {
      const { status, body } = await implementation.deletePet(ctx.state, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  server.use(router.allowedMethods())
  server.use(router.routes())

  server.listen(configuration.port, () => {
    console.info("server listening", { port: configuration.port })
  })

  return server
}
