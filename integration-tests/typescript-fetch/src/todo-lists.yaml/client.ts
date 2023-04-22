/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { t_CreateUpdateTodoList, t_Error, t_TodoList } from "./models"
import {
  AbstractFetchClient,
  AbstractFetchClientConfig,
  Response,
  StatusCode,
  StatusCode2xx,
  StatusCode3xx,
  StatusCode4xx,
  StatusCode5xx,
} from "@nahkies/typescript-fetch-runtime/main"

export interface ApiClientConfig extends AbstractFetchClientConfig {}

export class ApiClient extends AbstractFetchClient {
  constructor(config: ApiClientConfig) {
    super(config)
  }

  async getTodoLists(
    p: {
      created?: string
      status?: "incomplete" | "complete"
    } = {}
  ): Promise<Response<200, t_TodoList[]>> {
    const url = this.basePath + `/list`
    const query = this._query({ created: p["created"], status: p["status"] })
    const res = await fetch(url + query, { method: "GET" })

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }

  async getTodoListById(p: {
    listId: string
  }): Promise<
    | Response<200, t_TodoList>
    | Response<StatusCode4xx, t_Error>
    | Response<StatusCode, void>
  > {
    const url = this.basePath + `/list/${p["listId"]}`

    const res = await fetch(url, { method: "GET" })

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }

  async updateTodoListById(p: {
    listId: string
    requestBody: t_CreateUpdateTodoList
  }): Promise<
    | Response<200, t_TodoList>
    | Response<StatusCode4xx, t_Error>
    | Response<StatusCode, void>
  > {
    const url = this.basePath + `/list/${p["listId"]}`
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = JSON.stringify(p.requestBody)
    const res = await fetch(url, { method: "PUT", headers, body })

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }

  async deleteTodoListById(p: {
    listId: string
  }): Promise<
    | Response<204, void>
    | Response<StatusCode4xx, t_Error>
    | Response<StatusCode, void>
  > {
    const url = this.basePath + `/list/${p["listId"]}`

    const res = await fetch(url, { method: "DELETE" })

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }
}