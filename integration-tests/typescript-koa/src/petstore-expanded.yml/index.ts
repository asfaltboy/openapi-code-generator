/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import cors from "@koa/cors"
import KoaRouter from "@koa/router"
import Koa from "koa"
import koaBody from "koa-body"

const PORT = 3000

// ApiClient
const server = new Koa()

server.use(cors())
server.use(koaBody())

const router = new KoaRouter()

router.get("/pets", async (ctx, next) => {
  ctx.status = 501
  ctx.body = { error: "not implemented" }
  return next()
})

router.post("/pets", async (ctx, next) => {
  ctx.status = 501
  ctx.body = { error: "not implemented" }
  return next()
})

router.get("/pets/{id}", async (ctx, next) => {
  ctx.status = 501
  ctx.body = { error: "not implemented" }
  return next()
})

router.delete("/pets/{id}", async (ctx, next) => {
  ctx.status = 501
  ctx.body = { error: "not implemented" }
  return next()
})

server.use(router.allowedMethods())
server.use(router.routes())

server.listen(PORT, () => {
  console.info("server listening", { port: PORT })
})
