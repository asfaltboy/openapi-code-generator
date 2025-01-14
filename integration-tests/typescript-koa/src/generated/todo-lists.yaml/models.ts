/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

export type t_Error = {
  code?: number
  message?: string
}

export type t_TodoList = {
  created: string
  id: string
  incompleteItemCount: number
  name: string
  totalItemCount: number
  updated: string
}

export type t_DeleteTodoListByIdParamSchema = {
  listId: string
}

export type t_GetTodoListByIdParamSchema = {
  listId: string
}

export type t_GetTodoListsQuerySchema = {
  created?: string
  status?: "incomplete" | "complete"
}

export type t_UpdateTodoListByIdBodySchema = {
  name: string
}

export type t_UpdateTodoListByIdParamSchema = {
  listId: string
}
