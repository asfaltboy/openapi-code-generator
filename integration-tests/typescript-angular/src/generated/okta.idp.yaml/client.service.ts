/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import {
  EmptyObject,
  t_AppAuthenticatorEnrollment,
  t_AppAuthenticatorEnrollmentRequest,
  t_AppAuthenticatorMethodCapabilities,
  t_Email,
  t_Error,
  t_KeyEC,
  t_KeyObject,
  t_KeyRSA,
  t_Phone,
  t_Profile,
  t_PushNotificationChallenge,
  t_PushNotificationVerification,
  t_Schema,
  t_UpdateAppAuthenticatorEnrollmentRequest,
} from "./models"
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { z } from "zod"

export class ApiClientConfig {
  basePath: string = ""
  defaultHeaders: Record<string, string> = {}
}

// from https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
type Enumerate<
  N extends number,
  Acc extends number[] = [],
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
    private readonly config: ApiClientConfig,
  ) {}

  private _headers(
    headers: Record<string, string | undefined>,
  ): Record<string, string> {
    return Object.fromEntries(
      Object.entries({ ...this.config.defaultHeaders, ...headers }).filter(
        (it): it is [string, string] => it[1] !== undefined,
      ),
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
        `query parameter '${name}' with value '${value}' is not yet supported`,
      )
    }, new HttpParams())
  }

  createAppAuthenticatorEnrollment(p: {
    requestBody: t_AppAuthenticatorEnrollmentRequest
  }): Observable<
    | (HttpResponse<t_AppAuthenticatorEnrollment> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/idp/myaccount/app-authenticators`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  verifyAppAuthenticatorPushNotificationChallenge(p: {
    challengeId: string
    requestBody: t_PushNotificationVerification
  }): Observable<
    | (HttpResponse<void> & { status: 200 })
    | (HttpResponse<void> & { status: 204 })
    | (HttpResponse<void> & { status: 400 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath +
        `/idp/myaccount/app-authenticators/challenge/${p["challengeId"]}/verify`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  updateAppAuthenticatorEnrollment(p: {
    enrollmentId: string
    requestBody: t_UpdateAppAuthenticatorEnrollmentRequest
  }): Observable<
    | (HttpResponse<t_UpdateAppAuthenticatorEnrollmentRequest> & {
        status: 200
      })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "PATCH",
      this.config.basePath +
        `/idp/myaccount/app-authenticators/${p["enrollmentId"]}`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  deleteAppAuthenticatorEnrollment(p: {
    enrollmentId: string
  }): Observable<
    | (HttpResponse<void> & { status: 204 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "DELETE",
      this.config.basePath +
        `/idp/myaccount/app-authenticators/${p["enrollmentId"]}`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  listAppAuthenticatorPendingPushNotificationChallenges(p: {
    enrollmentId: string
  }): Observable<
    | (HttpResponse<t_PushNotificationChallenge[]> & { status: 200 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath +
        `/idp/myaccount/app-authenticators/${p["enrollmentId"]}/push/notifications`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  listEmails(): Observable<
    | (HttpResponse<t_Email[]> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/idp/myaccount/emails`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  createEmail(p: {
    requestBody: {
      profile: {
        email: string
      }
      role?: "PRIMARY" | "SECONDARY"
      sendEmail?: boolean
      state?: string
    }
  }): Observable<
    | (HttpResponse<t_Email> & { status: 201 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 409 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/idp/myaccount/emails`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  getEmail(p: {
    id: string
  }): Observable<
    | (HttpResponse<t_Email> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/idp/myaccount/emails/${p["id"]}`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  deleteEmail(p: {
    id: string
  }): Observable<
    | (HttpResponse<void> & { status: 204 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "DELETE",
      this.config.basePath + `/idp/myaccount/emails/${p["id"]}`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  sendEmailChallenge(p: {
    id: string
    requestBody: {
      state: string
    }
  }): Observable<
    | (HttpResponse<{
        _links: {
          poll: {
            hints: {
              allow: string[]
            }
            href: string
          }
          verify: {
            hints: {
              allow: string[]
            }
            href: string
          }
        }
        expiresAt: string
        id: string
        profile: {
          email: string
        }
        status: string
      }> & { status: 201 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/idp/myaccount/emails/${p["id"]}/challenge`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  pollChallengeForEmailMagicLink(p: {
    id: string
    challengeId: string
  }): Observable<
    | (HttpResponse<{
        _links: {
          poll: {
            hints: {
              allow: string[]
            }
            href: string
          }
          verify: {
            hints: {
              allow: string[]
            }
            href: string
          }
        }
        expiresAt: string
        id: string
        profile: {
          email: string
        }
        status: string
      }> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath +
        `/idp/myaccount/emails/${p["id"]}/challenge/${p["challengeId"]}`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  verifyEmailOtp(p: {
    id: string
    challengeId: string
    requestBody: {
      verificationCode: string
    }
  }): Observable<
    | (HttpResponse<void> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath +
        `/idp/myaccount/emails/${p["id"]}/challenge/${p["challengeId"]}/verify`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  listPhones(): Observable<
    | (HttpResponse<t_Phone[]> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/idp/myaccount/phones`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  createPhone(p: {
    requestBody: {
      method?: "SMS" | "CALL"
      profile?: {
        phoneNumber?: string
      }
      sendCode?: boolean
    }
  }): Observable<
    | (HttpResponse<t_Phone> & { status: 201 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 409 })
    | (HttpResponse<t_Error> & { status: 500 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/idp/myaccount/phones`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  getPhone(p: {
    id: string
  }): Observable<
    | (HttpResponse<t_Phone> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/idp/myaccount/phones/${p["id"]}`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  deletePhone(p: {
    id: string
  }): Observable<
    | (HttpResponse<void> & { status: 204 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "DELETE",
      this.config.basePath + `/idp/myaccount/phones/${p["id"]}`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  sendPhoneChallenge(p: {
    id: string
    requestBody: {
      method: "SMS" | "CALL"
      retry?: boolean
    }
  }): Observable<
    | (HttpResponse<{
        _links?: {
          verify?: {
            hints: {
              allow: string[]
            }
            href: string
          }
        }
      }> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | (HttpResponse<t_Error> & { status: 500 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/idp/myaccount/phones/${p["id"]}/challenge`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  verifyPhoneChallenge(p: {
    id: string
    requestBody: {
      verificationCode: string
    }
  }): Observable<
    | (HttpResponse<void> & { status: 204 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | (HttpResponse<t_Error> & { status: 404 })
    | (HttpResponse<t_Error> & { status: 409 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "POST",
      this.config.basePath + `/idp/myaccount/phones/${p["id"]}/verify`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  getProfile(): Observable<
    | (HttpResponse<t_Profile> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/idp/myaccount/profile`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }

  replaceProfile(p: {
    requestBody: {
      profile?: EmptyObject
    }
  }): Observable<
    | (HttpResponse<t_Profile> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 400 })
    | (HttpResponse<t_Error> & { status: 401 })
    | (HttpResponse<t_Error> & { status: 403 })
    | HttpResponse<unknown>
  > {
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = p["requestBody"]

    return this.httpClient.request<any>(
      "PUT",
      this.config.basePath + `/idp/myaccount/profile`,
      {
        headers,
        body,
        observe: "response",
        reportProgress: false,
      },
    )
  }

  getProfileSchema(): Observable<
    | (HttpResponse<t_Schema> & { status: 200 })
    | (HttpResponse<t_Error> & { status: 401 })
    | HttpResponse<unknown>
  > {
    return this.httpClient.request<any>(
      "GET",
      this.config.basePath + `/idp/myaccount/profile/schema`,
      {
        observe: "response",
        reportProgress: false,
      },
    )
  }
}
