/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import {
  t_AddPetBodySchema,
  t_DeletePetParamSchema,
  t_FindPetByIdParamSchema,
  t_FindPetsQuerySchema,
} from "./models"
import KoaRouter from "@koa/router"
import {
  ServerConfig,
  startServer,
} from "@nahkies/typescript-koa-runtime/server"
import { parseRequestInput } from "@nahkies/typescript-koa-runtime/zod"
import { Context, Next } from "koa"
import { z } from "zod"

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
  config: Omit<ServerConfig, "router">
) {
  // ApiClient
  const router = new KoaRouter()

  const findPetsQuerySchema = z.object({
    tags: z.array(z.coerce.string()).optional(),
    limit: z.coerce.number().optional(),
  })

  router.get(
    "findPets",
    "/pets",
    async (
      ctx: ValidatedCtx<void, t_FindPetsQuerySchema, void>,
      next: Next
    ) => {
      const input = {
        params: undefined,
        query: parseRequestInput(findPetsQuerySchema, ctx.query),
        body: undefined,
      }

      const { status, body } = await implementation.findPets(input, ctx)
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
    async (ctx: ValidatedCtx<void, void, t_AddPetBodySchema>, next: Next) => {
      const input = {
        params: undefined,
        query: undefined,
        body: parseRequestInput(addPetBodySchema, ctx.body),
      }

      const { status, body } = await implementation.addPet(input, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  const findPetByIdParamSchema = z.object({ id: z.coerce.number() })

  router.get(
    "findPetById",
    "/pets/:id",
    async (
      ctx: ValidatedCtx<t_FindPetByIdParamSchema, void, void>,
      next: Next
    ) => {
      const input = {
        params: parseRequestInput(findPetByIdParamSchema, ctx.params),
        query: undefined,
        body: undefined,
      }

      const { status, body } = await implementation.findPetById(input, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  const deletePetParamSchema = z.object({ id: z.coerce.number() })

  router.delete(
    "deletePet",
    "/pets/:id",
    async (
      ctx: ValidatedCtx<t_DeletePetParamSchema, void, void>,
      next: Next
    ) => {
      const input = {
        params: parseRequestInput(deletePetParamSchema, ctx.params),
        query: undefined,
        body: undefined,
      }

      const { status, body } = await implementation.deletePet(input, ctx)
      ctx.status = status
      ctx.body = body
      return next()
    }
  )

  return startServer({
    middleware: [],
    router,
    port: config.port,
  })
}
