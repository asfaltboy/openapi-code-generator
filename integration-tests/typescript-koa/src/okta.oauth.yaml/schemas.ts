/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

import { z } from "zod"

export const s_AcrValue = z.enum([
  "phr",
  "phrh",
  "urn:okta:loa:1fa:any",
  "urn:okta:loa:1fa:pwd",
  "urn:okta:loa:2fa:any",
  "urn:okta:loa:2fa:any:ifpossible",
])

export const s_AmrValue = z.enum([
  "duo",
  "email",
  "fed",
  "google_otp",
  "kba",
  "oath_otp",
  "okta_verify",
  "opt",
  "pop",
  "pwd",
  "rsa",
  "sms",
  "symantec",
  "tel",
  "yubikey",
])

export const s_ApplicationType = z.enum(["browser", "native", "service", "web"])

export const s_BackchannelAuthorizeRequest = z.object({
  binding_message: z.string().optional(),
  id_token_hint: z.string().optional(),
  login_hint: z.string().optional(),
  request: z.string().optional(),
  request_expiry: z.coerce.number().optional(),
  scope: z.string(),
})

export const s_BackchannelAuthorizeResponse = z.object({
  auth_req_id: z.string().optional(),
  expires_in: z.coerce.number().optional(),
  interval: z.coerce.number().optional(),
})

export const s_Claim = z.string()

export const s_CodeChallengeMethod = z.enum(["S256"])

export const s_DeviceAuthorizeRequest = z.object({
  client_id: z.string().optional(),
  scope: z.string().optional(),
})

export const s_DeviceAuthorizeResponse = z.object({
  device_code: z.string().optional(),
  expires_in: z.coerce.number().optional(),
  interval: z.coerce.number().optional(),
  user_code: z.string().optional(),
  verification_uri: z.string().optional(),
  verification_uri_complete: z.string().optional(),
})

export const s_EndpointAuthMethod = z.enum([
  "client_secret_basic",
  "client_secret_jwt",
  "client_secret_post",
  "none",
  "private_key_jwt",
])

export const s_Error = z.object({
  errorCauses: z
    .array(z.object({ errorSummary: z.string().optional() }))
    .optional(),
  errorCode: z.string().optional(),
  errorId: z.string().optional(),
  errorLink: z.string().optional(),
  errorSummary: z.string().optional(),
})

export const s_GrantType = z.enum([
  "authorization_code",
  "client_credentials",
  "implicit",
  "interaction_code",
  "password",
  "refresh_token",
  "urn:ietf:params:oauth:grant-type:device_code",
  "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "urn:ietf:params:oauth:grant-type:saml2-bearer",
  "urn:ietf:params:oauth:grant-type:token-exchange",
  "urn:openid:params:grant-type:ciba",
])

export const s_IntrospectionResponse = z.object({
  active: z.coerce.boolean().optional(),
  aud: z.string().optional(),
  client_id: z.string().optional(),
  device_id: z.string().optional(),
  exp: z.coerce.number().optional(),
  iat: z.coerce.number().optional(),
  iss: z.string().optional(),
  jti: z.string().optional(),
  nbf: z.coerce.number().optional(),
  scope: z.string().optional(),
  sub: z.string().optional(),
  token_type: z.string().optional(),
  uid: z.string().optional(),
  username: z.string().optional(),
})

export const s_JsonWebKeyStatus = z.enum(["ACTIVE", "EXPIRED", "NEXT"])

export const s_JsonWebKeyType = z.enum(["EC", "RSA"])

export const s_JsonWebKeyUse = z.enum(["enc", "sig"])

export const s_OAuthError = z.object({
  error: z.string().optional(),
  error_description: z.string().optional(),
})

export const s_ParRequest = z.object({
  client_id: z.string().optional(),
  code_challenge: z.string().optional(),
  code_challenge_method: z.string().optional(),
  display: z.string().optional(),
  idp: z.string().optional(),
  idp_scope: z.string().optional(),
  login_hint: z.string().optional(),
  max_age: z.coerce.number().optional(),
  nonce: z.string().optional(),
  prompt: z.string().optional(),
  redirect_uri: z.string().optional(),
  request: z.string().optional(),
  response_mode: z.string().optional(),
  response_type: z.string().optional(),
  scope: z.string().optional(),
  sessionToken: z.string().optional(),
  state: z.string().optional(),
})

export const s_ParResponse = z.object({
  expires_in: z.coerce.number().optional(),
  request_uri: z.string().optional(),
})

export const s_Prompt = z.enum([
  "consent",
  "enroll_authenticator",
  "login",
  "login consent",
  "none",
])

export const s_ResponseMode = z.enum([
  "form_post",
  "fragment",
  "okta_post_message",
  "query",
])

export const s_ResponseType = z.enum(["code", "id_token", "none", "token"])

export const s_ResponseTypesSupported = z.enum([
  "code",
  "code id_token",
  "code id_token token",
  "code token",
  "id_token",
  "id_token token",
  "token",
])

export const s_Scope = z.string()

export const s_SigningAlgorithm = z.enum([
  "ES256",
  "ES384",
  "ES512",
  "HS256",
  "HS384",
  "HS512",
  "RS256",
  "RS384",
  "RS512",
])

export const s_SubjectType = z.enum(["pairwise", "public"])

export const s_TokenDeliveryMode = z.enum(["poll"])

export const s_TokenResponseTokenType = z.enum(["Bearer", "N_A"])

export const s_TokenType = z.enum([
  "urn:ietf:params:oauth:token-type:access_token",
  "urn:ietf:params:oauth:token-type:id_token",
  "urn:ietf:params:oauth:token-type:jwt",
  "urn:ietf:params:oauth:token-type:refresh_token",
  "urn:ietf:params:oauth:token-type:saml1",
  "urn:ietf:params:oauth:token-type:saml2",
  "urn:okta:oauth:token-type:web_sso_token",
  "urn:x-oath:params:oauth:token-type:device-secret",
])

export const s_TokenTypeHintIntrospect = z.enum([
  "access_token",
  "device_secret",
  "id_token",
  "refresh_token",
])

export const s_TokenTypeHintRevoke = z.enum([
  "access_token",
  "device_secret",
  "refresh_token",
])

export const s_UserInfo = z.object({ sub: z.string().optional() })

export const s_IntrospectionRequest = z.object({
  token: z.string().optional(),
  token_type_hint: s_TokenTypeHintIntrospect,
})

export const s_JsonWebKey = z.object({
  alg: s_SigningAlgorithm,
  kid: z.string().optional(),
  kty: s_JsonWebKeyType,
  status: s_JsonWebKeyStatus,
  use: s_JsonWebKeyUse,
})

export const s_OAuthMetadata = z.object({
  authorization_endpoint: z.string().optional(),
  backchannel_authentication_request_signing_alg_values_supported: z
    .array(s_SigningAlgorithm)
    .optional(),
  backchannel_token_delivery_modes_supported: z
    .array(s_TokenDeliveryMode)
    .optional(),
  claims_supported: z.array(s_Claim).optional(),
  code_challenge_methods_supported: z.array(s_CodeChallengeMethod).optional(),
  device_authorization_endpoint: z.string().optional(),
  end_session_endpoint: z.string().optional(),
  grant_types_supported: z.array(s_GrantType).optional(),
  introspection_endpoint: z.string().optional(),
  introspection_endpoint_auth_methods_supported: z
    .array(s_EndpointAuthMethod)
    .optional(),
  issuer: z.string().optional(),
  jwks_uri: z.string().optional(),
  pushed_authorization_request_endpoint: z.string().optional(),
  registration_endpoint: z.string().optional(),
  request_object_signing_alg_values_supported: z
    .array(s_SigningAlgorithm)
    .optional(),
  request_parameter_supported: z.coerce.boolean().optional(),
  response_modes_supported: z.array(s_ResponseMode).optional(),
  response_types_supported: z.array(s_ResponseTypesSupported).optional(),
  revocation_endpoint: z.string().optional(),
  revocation_endpoint_auth_methods_supported: z
    .array(s_EndpointAuthMethod)
    .optional(),
  scopes_supported: z.array(s_Scope).optional(),
  subject_types_supported: z.array(s_SubjectType).optional(),
  token_endpoint: z.string().optional(),
  token_endpoint_auth_methods_supported: z
    .array(s_EndpointAuthMethod)
    .optional(),
})

export const s_RevokeRequest = z.object({
  token: z.string().optional(),
  token_type_hint: s_TokenTypeHintRevoke,
})

export const s_TokenRequest = z.object({ grant_type: s_GrantType })

export const s_TokenResponse = z.object({
  access_token: z.string().optional(),
  device_secret: z.string().optional(),
  expires_in: z.coerce.number().optional(),
  id_token: z.string().optional(),
  issued_token_type: s_TokenType,
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  token_type: s_TokenResponseTokenType,
})

export const s_Client = z.object({
  application_type: s_ApplicationType,
  client_id: z.string().optional(),
  client_id_issued_at: z.coerce.number().optional(),
  client_name: z.string().optional(),
  client_secret: z.string().optional().nullable(),
  client_secret_expires_at: z.coerce.number().optional().nullable(),
  grant_types: z.array(s_GrantType).optional(),
  initiate_login_uri: z.string().optional(),
  jwks: z.array(s_JsonWebKey).optional(),
  jwks_uri: z.string().optional(),
  logo_uri: z.string().optional().nullable(),
  policy_uri: z.string().optional().nullable(),
  post_logout_redirect_uris: z.string().optional(),
  redirect_uris: z.array(z.string()).optional(),
  request_object_signing_alg: z.array(s_SigningAlgorithm).optional(),
  response_types: z.array(s_ResponseType).optional(),
  token_endpoint_auth_method: s_EndpointAuthMethod,
  tos_uri: z.string().optional().nullable(),
})

export const s_OAuthKeys = z.object({ keys: z.array(s_JsonWebKey).optional() })

export const s_OidcMetadata = s_OAuthMetadata.merge(
  z.object({
    id_token_signing_alg_values_supported: z
      .array(s_SigningAlgorithm)
      .optional(),
    userinfo_endpoint: z.string().optional(),
  }),
)
