/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { t_Error, t_NewPet, t_Pet } from "./models"
import {
  AbstractAxiosClient,
  AbstractAxiosConfig,
} from "@nahkies/typescript-axios-runtime/main"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { z } from "zod"

export class ApiClient extends AbstractAxiosClient {
  constructor(config: AbstractAxiosConfig) {
    super(config)
  }

  async findPets(
    p: {
      tags?: string[]
      limit?: number
    } = {},
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Pet[]>> {
    const url = `/pets`
    const query = this._query({ tags: p["tags"], limit: p["limit"] })

    return this.axios.request({
      url: url + query,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async addPet(
    p: {
      requestBody: t_NewPet
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Pet>> {
    const url = `/pets`
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = JSON.stringify(p.requestBody)

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "POST",
      headers,
      data: body,
      timeout,
      ...(opts ?? {}),
    })
  }

  async findPetById(
    p: {
      id: number
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Pet>> {
    const url = `/pets/${p["id"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async deletePet(
    p: {
      id: number
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/pets/${p["id"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "DELETE",
      timeout,
      ...(opts ?? {}),
    })
  }
}