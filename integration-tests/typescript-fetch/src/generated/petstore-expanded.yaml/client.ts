/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { t_Error, t_NewPet, t_Pet } from "./models"
import {
  AbstractFetchClient,
  AbstractFetchClientConfig,
  Res,
  StatusCode,
  StatusCode2xx,
  StatusCode3xx,
  StatusCode4xx,
  StatusCode5xx,
  TypedFetchResponse,
} from "@nahkies/typescript-fetch-runtime/main"
import { z } from "zod"

export interface ApiClientConfig extends AbstractFetchClientConfig {}

export class ApiClient extends AbstractFetchClient {
  constructor(config: ApiClientConfig) {
    super(config)
  }

  async findPets(
    p: {
      tags?: string[]
      limit?: number
    } = {},
    timeout?: number,
    opts?: RequestInit,
  ): Promise<TypedFetchResponse<Res<200, t_Pet[]> | Res<StatusCode, t_Error>>> {
    const url = this.basePath + `/pets`
    const query = this._query({ tags: p["tags"], limit: p["limit"] })

    return this._fetch(url + query, { method: "GET", ...(opts ?? {}) }, timeout)
  }

  async addPet(
    p: {
      requestBody: t_NewPet
    },
    timeout?: number,
    opts?: RequestInit,
  ): Promise<TypedFetchResponse<Res<200, t_Pet> | Res<StatusCode, t_Error>>> {
    const url = this.basePath + `/pets`
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = JSON.stringify(p.requestBody)

    return this._fetch(
      url,
      { method: "POST", headers, body, ...(opts ?? {}) },
      timeout,
    )
  }

  async findPetById(
    p: {
      id: number
    },
    timeout?: number,
    opts?: RequestInit,
  ): Promise<TypedFetchResponse<Res<200, t_Pet> | Res<StatusCode, t_Error>>> {
    const url = this.basePath + `/pets/${p["id"]}`

    return this._fetch(url, { method: "GET", ...(opts ?? {}) }, timeout)
  }

  async deletePet(
    p: {
      id: number
    },
    timeout?: number,
    opts?: RequestInit,
  ): Promise<TypedFetchResponse<Res<204, void> | Res<StatusCode, t_Error>>> {
    const url = this.basePath + `/pets/${p["id"]}`

    return this._fetch(url, { method: "DELETE", ...(opts ?? {}) }, timeout)
  }
}
