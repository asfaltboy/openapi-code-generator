/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import { Error, NewPet, Pet } from "./models"
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

  private headers(
    headers: Record<string, string | undefined>
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries({ ...this.config.defaultHeaders, ...headers }).filter(
        (it): it is [string, string] => it[1] !== undefined
      )
    )
  }

  private queryParams(
    queryParams: Record<string, boolean | number | string | undefined | null>
  ): HttpParams {
    const result = new HttpParams()
    Object.entries(queryParams).forEach(([name, value]) => {
      if (value !== undefined && value !== null) {
        result.set(name, String(value))
      }
    })
    return result
  }

  findPets(p: { tags?: string[]; limit?: number }): Observable<Pet[] | Error> {
    const headers: Record<string, string | undefined> = {}

    const queryParameters = { tags: p["tags"], limit: p["limit"] }

    return this.httpClient.request<any>("GET", this.config.basePath + `/pets`, {
      params: this.queryParams(queryParameters),
      headers: this.headers(headers),

      observe: "body",
      reportProgress: false,
    })
  }

  addPet(p: { requestBody: NewPet }): Observable<Pet | Error> {
    const headers: Record<string, string | undefined> = {
      "Content-Type": "application/json",
    }

    const queryParameters = {}

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/pets`,
      {
        params: this.queryParams(queryParameters),
        headers: this.headers(headers),
        body: p["requestBody"],
        observe: "body",
        reportProgress: false,
      }
    )
  }

  findPetById(p: { id: number }): Observable<Pet | Error> {
    const headers: Record<string, string | undefined> = {}

    const queryParameters = {}

    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/pets/${p["id"]}`,
      {
        params: this.queryParams(queryParameters),
        headers: this.headers(headers),

        observe: "body",
        reportProgress: false,
      }
    )
  }

  deletePet(p: { id: number }): Observable<void | Error> {
    const headers: Record<string, string | undefined> = {}

    const queryParameters = {}

    return this.httpClient.request<any>(
      "DELETE",
      this.config.basePath + `/pets/${p["id"]}`,
      {
        params: this.queryParams(queryParameters),
        headers: this.headers(headers),

        observe: "body",
        reportProgress: false,
      }
    )
  }
}
