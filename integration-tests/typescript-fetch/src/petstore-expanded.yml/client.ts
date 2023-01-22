/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint:disable */

import { Error, NewPet, Pet } from "./models"
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

  async findPets(p: {
    tags?: string[]
    limit?: number
  }): Promise<Res<200, Pet[]> | Res<number, Error>> {
    const headers: Record<string, string | undefined> = {}

    const res = await fetch(
      this.config.basePath +
        `/pets?${qs.stringify({ tags: p["tags"], limit: p["limit"] })}`,
      {
        method: "GET",
        headers: this.headers(headers),
      }
    )

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }

  async addPet(p: {
    requestBody: NewPet
  }): Promise<Res<200, Pet> | Res<number, Error>> {
    const headers: Record<string, string | undefined> = {
      "Content-Type": "application/json",
    }

    const res = await fetch(this.config.basePath + `/pets`, {
      method: "POST",
      headers: this.headers(headers),
      body: JSON.stringify(p.requestBody),
    })

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }

  async findPetById(p: {
    id: number
    species: string
  }): Promise<Res<200, Pet> | Res<number, Error>> {
    const headers: Record<string, string | undefined> = {}

    const res = await fetch(
      this.config.basePath + `/pets/${p["id"]}/${p["species"]}`,
      {
        method: "GET",
        headers: this.headers(headers),
      }
    )

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }

  async deletePet(p: {
    id: number
    species: string
  }): Promise<Res<204, void> | Res<number, Error>> {
    const headers: Record<string, string | undefined> = {}

    const res = await fetch(
      this.config.basePath + `/pets/${p["id"]}/${p["species"]}`,
      {
        method: "DELETE",
        headers: this.headers(headers),
      }
    )

    // TODO: this is a poor assumption
    return { status: res.status as any, body: (await res.json()) as any }
  }
}
