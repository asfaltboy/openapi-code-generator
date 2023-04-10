/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { z } from "zod"

export const s_Error = z.object({
  code: z.coerce.number(),
  message: z.coerce.string(),
})

export const s_NewPet = z.object({
  name: z.coerce.string(),
  tag: z.coerce.string().optional(),
})

export const s_Pet = s_NewPet.merge(z.object({ id: z.coerce.number() }))
