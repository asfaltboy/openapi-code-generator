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
  AbstractAxiosClient,
  AbstractAxiosConfig,
} from "@nahkies/typescript-axios-runtime/main"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { z } from "zod"

export class ApiClient extends AbstractAxiosClient {
  constructor(config: AbstractAxiosConfig) {
    super(config)
  }

  async createAppAuthenticatorEnrollment(
    p: {
      requestBody: t_AppAuthenticatorEnrollmentRequest
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_AppAuthenticatorEnrollment>> {
    const url = `/idp/myaccount/app-authenticators`
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

  async verifyAppAuthenticatorPushNotificationChallenge(
    p: {
      challengeId: string
      requestBody: t_PushNotificationVerification
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/idp/myaccount/app-authenticators/challenge/${p["challengeId"]}/verify`
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

  async updateAppAuthenticatorEnrollment(
    p: {
      enrollmentId: string
      requestBody: t_UpdateAppAuthenticatorEnrollmentRequest
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_UpdateAppAuthenticatorEnrollmentRequest>> {
    const url = `/idp/myaccount/app-authenticators/${p["enrollmentId"]}`
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = JSON.stringify(p.requestBody)

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "PATCH",
      headers,
      data: body,
      timeout,
      ...(opts ?? {}),
    })
  }

  async deleteAppAuthenticatorEnrollment(
    p: {
      enrollmentId: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/idp/myaccount/app-authenticators/${p["enrollmentId"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "DELETE",
      timeout,
      ...(opts ?? {}),
    })
  }

  async listAppAuthenticatorPendingPushNotificationChallenges(
    p: {
      enrollmentId: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_PushNotificationChallenge[]>> {
    const url = `/idp/myaccount/app-authenticators/${p["enrollmentId"]}/push/notifications`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async listEmails(
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Email[]>> {
    const url = `/idp/myaccount/emails`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async createEmail(
    p: {
      requestBody: {
        profile: {
          email: string
        }
        role?: "PRIMARY" | "SECONDARY"
        sendEmail?: boolean
        state?: string
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Email>> {
    const url = `/idp/myaccount/emails`
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

  async getEmail(
    p: {
      id: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Email>> {
    const url = `/idp/myaccount/emails/${p["id"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async deleteEmail(
    p: {
      id: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/idp/myaccount/emails/${p["id"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "DELETE",
      timeout,
      ...(opts ?? {}),
    })
  }

  async sendEmailChallenge(
    p: {
      id: string
      requestBody: {
        state: string
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<
    AxiosResponse<{
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
    }>
  > {
    const url = `/idp/myaccount/emails/${p["id"]}/challenge`
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

  async pollChallengeForEmailMagicLink(
    p: {
      id: string
      challengeId: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<
    AxiosResponse<{
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
    }>
  > {
    const url = `/idp/myaccount/emails/${p["id"]}/challenge/${p["challengeId"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async verifyEmailOtp(
    p: {
      id: string
      challengeId: string
      requestBody: {
        verificationCode: string
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/idp/myaccount/emails/${p["id"]}/challenge/${p["challengeId"]}/verify`
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

  async listPhones(
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Phone[]>> {
    const url = `/idp/myaccount/phones`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async createPhone(
    p: {
      requestBody: {
        method?: "SMS" | "CALL"
        profile?: {
          phoneNumber?: string
        }
        sendCode?: boolean
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Phone>> {
    const url = `/idp/myaccount/phones`
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

  async getPhone(
    p: {
      id: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Phone>> {
    const url = `/idp/myaccount/phones/${p["id"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async deletePhone(
    p: {
      id: string
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/idp/myaccount/phones/${p["id"]}`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "DELETE",
      timeout,
      ...(opts ?? {}),
    })
  }

  async sendPhoneChallenge(
    p: {
      id: string
      requestBody: {
        method: "SMS" | "CALL"
        retry?: boolean
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<
    AxiosResponse<{
      _links?: {
        verify?: {
          hints: {
            allow: string[]
          }
          href: string
        }
      }
    }>
  > {
    const url = `/idp/myaccount/phones/${p["id"]}/challenge`
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

  async verifyPhoneChallenge(
    p: {
      id: string
      requestBody: {
        verificationCode: string
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    const url = `/idp/myaccount/phones/${p["id"]}/verify`
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

  async getProfile(
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Profile>> {
    const url = `/idp/myaccount/profile`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }

  async replaceProfile(
    p: {
      requestBody: {
        profile?: EmptyObject
      }
    },
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Profile>> {
    const url = `/idp/myaccount/profile`
    const headers = this._headers({ "Content-Type": "application/json" })
    const body = JSON.stringify(p.requestBody)

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "PUT",
      headers,
      data: body,
      timeout,
      ...(opts ?? {}),
    })
  }

  async getProfileSchema(
    timeout?: number,
    opts?: AxiosRequestConfig,
  ): Promise<AxiosResponse<t_Schema>> {
    const url = `/idp/myaccount/profile/schema`

    return this.axios.request({
      url: url,
      baseURL: this.basePath,
      method: "GET",
      timeout,
      ...(opts ?? {}),
    })
  }
}
