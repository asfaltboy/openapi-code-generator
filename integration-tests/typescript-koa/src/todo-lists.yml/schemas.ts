/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { z } from "zod"

export const s_Error = z.object({
  message: z.coerce.string().optional(),
  code: z.coerce.number().optional(),
})

export const s_CreateUpdateTodoList = z.object({ name: z.coerce.string() })

export const s_TodoList = z.object({
  id: z.coerce.string(),
  name: z.coerce.string(),
  totalItemCount: z.coerce.number(),
  incompleteItemCount: z.coerce.number(),
  created: z.coerce.string().datetime({ offset: true }),
  updated: z.coerce.string().datetime({ offset: true }),
})
