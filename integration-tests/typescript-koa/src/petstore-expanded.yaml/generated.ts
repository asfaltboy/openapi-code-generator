/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import {
  t_AddPetBodySchema,
  t_DeletePetParamSchema,
  t_Error,
  t_FindPetByIdParamSchema,
  t_FindPetsQuerySchema,
  t_NewPet,
  t_Pet,
} from "./models"
import { s_Error, s_NewPet, s_Pet } from "./schemas"
import KoaRouter from "@koa/router"
import {
  Response,
  ServerConfig,
  StatusCode,
  StatusCode2xx,
  StatusCode3xx,
  StatusCode4xx,
  StatusCode5xx,
  startServer,
} from "@nahkies/typescript-koa-runtime/server"
import {
  Params,
  parseRequestInput,
  responseValidationFactory,
} from "@nahkies/typescript-koa-runtime/zod"
import { Context } from "koa"
import koaBody from "koa-body"
import { z } from "zod"

//region safe-edit-region-header

//endregion safe-edit-region-header
export type FindPets = (
  params: Params<void, t_FindPetsQuerySchema, void>,
  ctx: Context,
) => Promise<Response<200, t_Pet[]> | Response<StatusCode, t_Error>>

export type AddPet = (
  params: Params<void, void, t_AddPetBodySchema>,
  ctx: Context,
) => Promise<Response<200, t_Pet> | Response<StatusCode, t_Error>>

export type FindPetById = (
  params: Params<t_FindPetByIdParamSchema, void, void>,
  ctx: Context,
) => Promise<Response<200, t_Pet> | Response<StatusCode, t_Error>>

export type DeletePet = (
  params: Params<t_DeletePetParamSchema, void, void>,
  ctx: Context,
) => Promise<Response<204, void> | Response<StatusCode, t_Error>>

export type Implementation = {
  findPets: FindPets
  addPet: AddPet
  findPetById: FindPetById
  deletePet: DeletePet
}

export function bootstrap(
  implementation: Implementation,
  config: Omit<ServerConfig, "router">,
) {
  // ApiClient
  const router = new KoaRouter()

  const findPetsQuerySchema = z.object({
    tags: z.array(z.coerce.string()).optional(),
    limit: z.coerce.number().optional(),
  })

  const findPetsResponseValidator = responseValidationFactory(
    [["200", z.array(s_Pet)]],
    s_Error,
  )

  router.get("findPets", "/pets", async (ctx, next) => {
    const input = {
      params: undefined,
      query: parseRequestInput(findPetsQuerySchema, ctx.query),
      body: undefined,
    }

    const { status, body } = await implementation.findPets(input, ctx)

    ctx.body = findPetsResponseValidator(status, body)
    ctx.status = status
    return next()
  })

  const addPetBodySchema = s_NewPet

  const addPetResponseValidator = responseValidationFactory(
    [["200", s_Pet]],
    s_Error,
  )

  router.post("addPet", "/pets", async (ctx, next) => {
    const input = {
      params: undefined,
      query: undefined,
      body: parseRequestInput(addPetBodySchema, ctx.request.body),
    }

    const { status, body } = await implementation.addPet(input, ctx)

    ctx.body = addPetResponseValidator(status, body)
    ctx.status = status
    return next()
  })

  const findPetByIdParamSchema = z.object({ id: z.coerce.number() })

  const findPetByIdResponseValidator = responseValidationFactory(
    [["200", s_Pet]],
    s_Error,
  )

  router.get("findPetById", "/pets/:id", async (ctx, next) => {
    const input = {
      params: parseRequestInput(findPetByIdParamSchema, ctx.params),
      query: undefined,
      body: undefined,
    }

    const { status, body } = await implementation.findPetById(input, ctx)

    ctx.body = findPetByIdResponseValidator(status, body)
    ctx.status = status
    return next()
  })

  const deletePetParamSchema = z.object({ id: z.coerce.number() })

  const deletePetResponseValidator = responseValidationFactory(
    [["204", z.void()]],
    s_Error,
  )

  router.delete("deletePet", "/pets/:id", async (ctx, next) => {
    const input = {
      params: parseRequestInput(deletePetParamSchema, ctx.params),
      query: undefined,
      body: undefined,
    }

    const { status, body } = await implementation.deletePet(input, ctx)

    ctx.body = deletePetResponseValidator(status, body)
    ctx.status = status
    return next()
  })

  return startServer({
    middleware: [],
    router,
    port: config.port,
  })
}
