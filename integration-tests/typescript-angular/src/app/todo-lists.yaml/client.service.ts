/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { t_CreateUpdateTodoList, t_Error, t_TodoList } from "./models"
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

export class ApiClientConfig {
  basePath: string = ""
  defaultHeaders: Record<string, string> = {}
}

export interface Res<StatusCode, Body> {
  status: StatusCode
  body: Body
}

@Injectable({
  providedIn: "root",
})
export class ApiClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly config: ApiClientConfig
  ) {}

  private _headers(
    headers: Record<string, string | undefined>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries({ ...this.config.defaultHeaders, ...headers }).filter(
        (it): it is [string, string] => it[1] !== undefined
      )
    )
  }

  private _queryParams(
    queryParams: Record<
      string,
      boolean | number | string | string[] | undefined | null
    >
  ): HttpParams {
    const result = new HttpParams()
    Object.entries(queryParams).forEach(([name, value]) => {
      if (value !== undefined && value !== null) {
        result.set(name, String(value))
      }
    })
    return result
  }

  getTodoLists(
    p: {
      created?: string
      status?: "incomplete" | "complete"
    } = {}
  ): Observable<t_TodoList[]> {
    const params = this._queryParams({
      created: p["created"],
      status: p["status"],
    })

    return this.httpClient.request<any>("GET", this.config.basePath + `/list`, {
      params,
      observe: "body",
      reportProgress: false,
    })
  }

  getTodoListById(p: {
    listId: string
  }): Observable<t_TodoList | t_Error | void> {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/list/${p["listId"]}`,
      {
        observe: "body",
        reportProgress: false,
      }
    )
  }

  updateTodoListById(p: {
    listId: string
    requestBody: t_CreateUpdateTodoList
  }): Observable<t_TodoList | t_Error | void> {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "PUT",
      this.config.basePath + `/list/${p["listId"]}`,
      {
        headers,
        body,
        observe: "body",
        reportProgress: false,
      }
    )
  }

  deleteTodoListById(p: { listId: string }): Observable<void | t_Error | void> {
    return this.httpClient.request<any>(
      "DELETE",
      this.config.basePath + `/list/${p["listId"]}`,
      {
        observe: "body",
        reportProgress: false,
      }
    )
  }
}