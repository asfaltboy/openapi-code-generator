/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { z } from "zod"

export const s_AppAuthenticatorEnrollment = z.object({
  authenticatorId: z.string().optional(),
  createdDate: z.string().datetime({ offset: true }).optional(),
  device: z
    .object({
      id: z.string().optional(),
      status: z.enum(["ACTIVE"]).optional(),
      createdDate: z.string().datetime({ offset: true }).optional(),
      lastUpdated: z.string().datetime({ offset: true }).optional(),
      clientInstanceId: z.string().optional(),
    })
    .optional(),
  id: z.string().optional(),
  lastUpdated: z.string().datetime({ offset: true }).optional(),
  links: z
    .object({
      self: z
        .object({
          href: z.string().optional(),
          hints: z
            .object({ allow: z.array(z.enum(["PATCH", "DELETE"])).optional() })
            .optional(),
        })
        .optional(),
    })
    .optional(),
  methods: z.object({ push: z.object({}).optional() }).optional(),
  user: z
    .object({ id: z.string().optional(), username: z.string().optional() })
    .optional(),
})

export const s_AppAuthenticatorMethodCapabilities = z.object({
  transactionTypes: z.array(z.enum(["LOGIN", "CIBA"])).optional(),
})

export const s_Email = z.object({
  id: z.string(),
  profile: z.object({ email: z.string() }),
  roles: z.array(z.string()),
  status: z.string(),
  _links: z
    .object({
      self: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
      challenge: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
      verify: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
      poll: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
    })
    .optional(),
})

export const s_Error = z.object({
  errorCauses: z
    .array(z.object({ errorSummary: z.string().optional() }))
    .optional(),
  errorCode: z.string().optional(),
  errorId: z.string().optional(),
  errorLink: z.string().optional(),
  errorSummary: z.string().optional(),
})

export const s_KeyEC = z.object({
  crv: z.enum(["P-256"]),
  kid: z.string(),
  kty: z.enum(["EC"]),
  "okta:kpr": z.enum(["HARDWARE", "SOFTWARE"]),
  x: z.string(),
  y: z.string(),
})

export const s_KeyRSA = z.object({
  e: z.string(),
  kid: z.string(),
  kty: z.enum(["RSA"]),
  n: z.string(),
  "okta:kpr": z.enum(["HARDWARE", "SOFTWARE"]),
})

export const s_Phone = z.object({
  id: z.string(),
  profile: z.object({ phoneNumber: z.string() }),
  status: z.string(),
  _links: z
    .object({
      self: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
      challenge: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
      verify: z
        .object({
          href: z.string().optional(),
          hints: z.object({ allow: z.array(z.string()).optional() }).optional(),
        })
        .optional(),
    })
    .optional(),
})

export const s_Profile = z.object({
  createdAt: z.string().datetime({ offset: true }).optional(),
  modifiedAt: z.string().datetime({ offset: true }).optional(),
  profile: z.object({}).optional(),
  _links: z
    .object({
      self: z.object({ href: z.string().optional() }).optional(),
      describedBy: z.object({ href: z.string().optional() }).optional(),
    })
    .optional(),
})

export const s_PushNotificationChallenge = z.object({
  challenge: z.string().optional(),
  payloadVersion: z.enum(["IDXv1"]).optional(),
})

export const s_PushNotificationVerification = z.object({
  challengeResponse: z.string().optional(),
  method: z.enum(["push"]).optional(),
})

export const s_Schema = z.object({
  properties: z.object({}).optional(),
  _links: z
    .object({
      self: z.object({ href: z.string().optional() }).optional(),
      user: z.object({ href: z.string().optional() }).optional(),
    })
    .optional(),
})

export const s_KeyObject = z.union([s_KeyEC, s_KeyRSA])

export const s_AppAuthenticatorEnrollmentRequest = z.object({
  authenticatorId: z.string(),
  device: z.object({
    secureHardwarePresent: z.coerce.boolean().optional(),
    clientInstanceKey: s_KeyObject,
    osVersion: z.string(),
    clientInstanceBundleId: z.string(),
    platform: z.enum(["ANDROID", "IOS"]),
    manufacturer: z.string().optional(),
    deviceAttestation: z.object({}).optional(),
    clientInstanceVersion: z.string(),
    clientInstanceDeviceSdkVersion: z.string(),
    model: z.string().optional(),
    displayName: z.string(),
    udid: z.string().optional(),
  }),
  methods: z.object({
    push: z.object({
      apsEnvironment: z.enum(["PRODUCTION", "DEVELOPMENT"]).optional(),
      pushToken: z.string(),
      keys: z.object({
        proofOfPossession: s_KeyObject,
        userVerification: s_KeyObject.optional(),
        capabilities: s_AppAuthenticatorMethodCapabilities.optional(),
      }),
    }),
  }),
})

export const s_UpdateAppAuthenticatorEnrollmentRequest = z.object({
  methods: z
    .object({
      push: z
        .object({
          pushToken: z.string().optional(),
          keys: z
            .object({ userVerification: s_KeyObject.optional() })
            .optional(),
          capabilities: s_AppAuthenticatorMethodCapabilities.optional(),
        })
        .optional(),
    })
    .optional(),
})
