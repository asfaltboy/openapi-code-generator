/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import { CreateUpdateTodoList, Error, TodoList } from "./models"
import fetch from "node-fetch"
import qs from "querystring"

export interface ApiClientConfig {
  basePath: string
  defaultHeaders: Record<string, string>
}

export interface Res<StatusCode, Body> {
  status: StatusCode
  body: Body
}

export class ApiClient {
  constructor(private readonly config: ApiClientConfig) {}

  private headers(
    headers: Record<string, string | undefined>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries({ ...this.config.defaultHeaders, ...headers }).filter(
        (it): it is [string, string] => it[1] !== undefined
      )
    )
  }

  async getTodoListById(p: {
    listId: string
  }): Promise<Res<200, TodoList> | Res<number, Error> | Res<number, void>> {
    const headers: Record<string, string | undefined> = {}

    return fetch(this.config.basePath + `/list/${p["listId"]}`, {
      method: "GET",
      headers: this.headers(headers),
    }).then((res) => res.json())
  }

  async updateTodoListById(p: {
    listId: string
    requestBody: CreateUpdateTodoList
  }): Promise<Res<200, TodoList> | Res<number, Error> | Res<number, void>> {
    const headers: Record<string, string | undefined> = {
      "Content-Type": "application/json",
    }

    return fetch(this.config.basePath + `/list/${p["listId"]}`, {
      method: "PUT",
      headers: this.headers(headers),
      body: JSON.stringify(p.requestBody),
    }).then((res) => res.json())
  }

  async deleteTodoListById(p: {
    listId: string
  }): Promise<Res<204, void> | Res<number, Error> | Res<number, void>> {
    const headers: Record<string, string | undefined> = {}

    return fetch(this.config.basePath + `/list/${p["listId"]}`, {
      method: "DELETE",
      headers: this.headers(headers),
    }).then((res) => res.json())
  }
}
