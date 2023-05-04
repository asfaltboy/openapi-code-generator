/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { t_CreateUpdateTodoList, t_Error, t_TodoList } from "./models"
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

export class ApiClientConfig {
  basePath: string = ""
  defaultHeaders: Record<string, string> = {}
}

// from https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>

type IntRange<F extends number, T extends number> = F extends T
  ? F
  : Exclude<Enumerate<T>, Enumerate<F>> extends never
  ? never
  : Exclude<Enumerate<T>, Enumerate<F>> | T

export type StatusCode1xx = IntRange<100, 199>
export type StatusCode2xx = IntRange<200, 299>
export type StatusCode3xx = IntRange<300, 399>
export type StatusCode4xx = IntRange<400, 499>
export type StatusCode5xx = IntRange<500, 599>
export type StatusCode =
  | StatusCode1xx
  | StatusCode2xx
  | StatusCode3xx
  | StatusCode4xx
  | StatusCode5xx

export type QueryParams = {
  [name: string]:
    | string
    | number
    | boolean
    | string[]
    | undefined
    | null
    | QueryParams
    | QueryParams[]
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

  private _queryParams(queryParams: QueryParams): HttpParams {
    return Object.entries(queryParams).reduce((result, [name, value]) => {
      if (
        typeof value === "string" ||
        typeof value === "boolean" ||
        typeof value === "number"
      ) {
        return result.set(name, value)
      } else if (value === null || value === undefined) {
        return result
      }
      throw new Error(
        `query parameter '${name}' with value '${value}' is not yet supported`
      )
    }, new HttpParams())
  }

  getTodoLists(
    p: {
      created?: string
      status?: "incomplete" | "complete"
    } = {}
  ): Observable<
    (HttpResponse<t_TodoList[]> & { status: 200 }) | HttpResponse<unknown>
  > {
    const params = this._queryParams({
      created: p["created"],
      status: p["status"],
    })

    return this.httpClient.request<any>("GET", this.config.basePath + `/list`, {
      params,
      observe: "response",
      reportProgress: false,
    })
  }

  getTodoListById(p: {
    listId: string
  }): Observable<
    | (HttpResponse<t_TodoList> & { status: 200 })
    | (HttpResponse<t_Error> & { status: StatusCode4xx })
    | (HttpResponse<void> & { status: StatusCode })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/list/${p["listId"]}`,
      {
        observe: "response",
        reportProgress: false,
      }
    )
  }

  updateTodoListById(p: {
    listId: string
    requestBody: t_CreateUpdateTodoList
  }): Observable<
    | (HttpResponse<t_TodoList> & { status: 200 })
    | (HttpResponse<t_Error> & { status: StatusCode4xx })
    | (HttpResponse<void> & { status: StatusCode })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "PUT",
      this.config.basePath + `/list/${p["listId"]}`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      }
    )
  }

  deleteTodoListById(p: {
    listId: string
  }): Observable<
    | (HttpResponse<void> & { status: 204 })
    | (HttpResponse<t_Error> & { status: StatusCode4xx })
    | (HttpResponse<void> & { status: StatusCode })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "DELETE",
      this.config.basePath + `/list/${p["listId"]}`,
      {
        observe: "response",
        reportProgress: false,
      }
    )
  }
}
