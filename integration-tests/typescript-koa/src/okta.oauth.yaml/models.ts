/** AUTOGENERATED - DO NOT EDIT **/
/* tslint:disable */
/* eslint-disable */

export type t_AcrValue =
  | "phr"
  | "phrh"
  | "urn:okta:loa:1fa:any"
  | "urn:okta:loa:1fa:pwd"
  | "urn:okta:loa:2fa:any"
  | "urn:okta:loa:2fa:any:ifpossible"

export type t_AmrValue =
  | "duo"
  | "email"
  | "fed"
  | "google_otp"
  | "kba"
  | "oath_otp"
  | "okta_verify"
  | "opt"
  | "pop"
  | "pwd"
  | "rsa"
  | "sms"
  | "symantec"
  | "tel"
  | "yubikey"

export type t_ApplicationType = "browser" | "native" | "service" | "web"

export type t_BackchannelAuthorizeResponse = {
  auth_req_id?: string
  expires_in?: number
  interval?: number
}

export type t_Claim = string

export type t_Client = {
  application_type?: t_ApplicationType
  readonly client_id?: string
  readonly client_id_issued_at?: number
  client_name?: string
  readonly client_secret?: string | null
  readonly client_secret_expires_at?: number | null
  grant_types?: t_GrantType[]
  initiate_login_uri?: string
  jwks?: t_JsonWebKey[]
  jwks_uri?: string
  logo_uri?: string | null
  policy_uri?: string | null
  post_logout_redirect_uris?: string
  redirect_uris?: string[]
  request_object_signing_alg?: t_SigningAlgorithm[]
  response_types?: t_ResponseType[]
  token_endpoint_auth_method?: t_EndpointAuthMethod
  tos_uri?: string | null
}

export type t_CodeChallengeMethod = "S256"

export type t_DeviceAuthorizeResponse = {
  device_code?: string
  expires_in?: number
  interval?: number
  user_code?: string
  verification_uri?: string
  verification_uri_complete?: string
}

export type t_EndpointAuthMethod =
  | "client_secret_basic"
  | "client_secret_jwt"
  | "client_secret_post"
  | "none"
  | "private_key_jwt"

export type t_Error = {
  errorCauses?: {
    errorSummary?: string
  }[]
  errorCode?: string
  errorId?: string
  errorLink?: string
  errorSummary?: string
}

export type t_GrantType =
  | "authorization_code"
  | "client_credentials"
  | "implicit"
  | "interaction_code"
  | "password"
  | "refresh_token"
  | "urn:ietf:params:oauth:grant-type:device_code"
  | "urn:ietf:params:oauth:grant-type:jwt-bearer"
  | "urn:ietf:params:oauth:grant-type:saml2-bearer"
  | "urn:ietf:params:oauth:grant-type:token-exchange"
  | "urn:openid:params:grant-type:ciba"

export type t_IntrospectionResponse =
  | {
      active?: boolean
      aud?: string
      client_id?: string
      device_id?: string
      exp?: number
      iat?: number
      iss?: string
      jti?: string
      nbf?: number
      scope?: string
      sub?: string
      token_type?: string
      uid?: string
      username?: string
    }
  | {
      [key: string]: unknown
    }

export type t_JsonWebKey = {
  alg?: t_SigningAlgorithm
  kid?: string
  kty?: t_JsonWebKeyType
  status?: t_JsonWebKeyStatus
  use?: t_JsonWebKeyUse
}

export type t_JsonWebKeyStatus = "ACTIVE" | "EXPIRED" | "NEXT"

export type t_JsonWebKeyType = "EC" | "RSA"

export type t_JsonWebKeyUse = "enc" | "sig"

export type t_OAuthError = {
  error?: string
  error_description?: string
}

export type t_OAuthKeys = {
  keys?: t_JsonWebKey[]
}

export type t_OAuthMetadata = {
  authorization_endpoint?: string
  backchannel_authentication_request_signing_alg_values_supported?: t_SigningAlgorithm[]
  backchannel_token_delivery_modes_supported?: t_TokenDeliveryMode[]
  claims_supported?: t_Claim[]
  code_challenge_methods_supported?: t_CodeChallengeMethod[]
  device_authorization_endpoint?: string
  end_session_endpoint?: string
  grant_types_supported?: t_GrantType[]
  introspection_endpoint?: string
  introspection_endpoint_auth_methods_supported?: t_EndpointAuthMethod[]
  issuer?: string
  jwks_uri?: string
  pushed_authorization_request_endpoint?: string
  registration_endpoint?: string
  request_object_signing_alg_values_supported?: t_SigningAlgorithm[]
  request_parameter_supported?: boolean
  response_modes_supported?: t_ResponseMode[]
  response_types_supported?: t_ResponseTypesSupported[]
  revocation_endpoint?: string
  revocation_endpoint_auth_methods_supported?: t_EndpointAuthMethod[]
  scopes_supported?: t_Scope[]
  subject_types_supported?: t_SubjectType[]
  token_endpoint?: string
  token_endpoint_auth_methods_supported?: t_EndpointAuthMethod[]
}

export type t_OidcMetadata = t_OAuthMetadata & {
  id_token_signing_alg_values_supported?: t_SigningAlgorithm[]
  userinfo_endpoint?: string
}

export type t_ParResponse = {
  expires_in?: number
  request_uri?: string
}

export type t_Prompt =
  | "consent"
  | "enroll_authenticator"
  | "login"
  | "login consent"
  | "none"

export type t_ResponseMode =
  | "form_post"
  | "fragment"
  | "okta_post_message"
  | "query"

export type t_ResponseType = "code" | "id_token" | "none" | "token"

export type t_ResponseTypesSupported =
  | "code"
  | "code id_token"
  | "code id_token token"
  | "code token"
  | "id_token"
  | "id_token token"
  | "token"

export type t_Scope = string

export type t_SigningAlgorithm =
  | "ES256"
  | "ES384"
  | "ES512"
  | "HS256"
  | "HS384"
  | "HS512"
  | "RS256"
  | "RS384"
  | "RS512"

export type t_SubjectType = "pairwise" | "public"

export type t_TokenDeliveryMode = "poll"

export type t_TokenResponse = {
  access_token?: string
  device_secret?: string
  expires_in?: number
  id_token?: string
  issued_token_type?: t_TokenType
  refresh_token?: string
  scope?: string
  token_type?: t_TokenResponseTokenType
}

export type t_TokenResponseTokenType = "Bearer" | "N_A"

export type t_TokenType =
  | "urn:ietf:params:oauth:token-type:access_token"
  | "urn:ietf:params:oauth:token-type:id_token"
  | "urn:ietf:params:oauth:token-type:jwt"
  | "urn:ietf:params:oauth:token-type:refresh_token"
  | "urn:ietf:params:oauth:token-type:saml1"
  | "urn:ietf:params:oauth:token-type:saml2"
  | "urn:okta:oauth:token-type:web_sso_token"
  | "urn:x-oath:params:oauth:token-type:device-secret"

export type t_TokenTypeHintIntrospect =
  | "access_token"
  | "device_secret"
  | "id_token"
  | "refresh_token"

export type t_TokenTypeHintRevoke =
  | "access_token"
  | "device_secret"
  | "refresh_token"

export type t_UserInfo =
  | {
      sub?: string
    }
  | {
      [key: string]: unknown
    }

export type t_AuthorizeQuerySchema = {
  acr_values?: t_AcrValue
  client_id?: string
  code_challenge?: string
  code_challenge_method?: t_CodeChallengeMethod
  display?: string
  enroll_amr_values?: t_AmrValue
  idp?: string
  idp_scope?: string
  login_hint?: string
  max_age?: number
  nonce?: string
  prompt?: t_Prompt
  redirect_uri?: string
  request?: string
  request_uri?: string
  response_mode?: t_ResponseMode
  response_type?: t_ResponseTypesSupported
  scope?: string
  sessionToken?: string
  state?: string
}

export type t_AuthorizeCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_AuthorizeCustomAsQuerySchema = {
  acr_values?: t_AcrValue
  client_id?: string
  code_challenge?: string
  code_challenge_method?: t_CodeChallengeMethod
  display?: string
  enroll_amr_values?: t_AmrValue
  idp?: string
  idp_scope?: string
  login_hint?: string
  max_age?: number
  nonce?: string
  prompt?: t_Prompt
  redirect_uri?: string
  request?: string
  request_uri?: string
  response_mode?: t_ResponseMode
  response_type?: t_ResponseTypesSupported
  scope?: string
  sessionToken?: string
  state?: string
}

export type t_BcAuthorizeBodySchema =
  | {
      binding_message?: string
      id_token_hint?: string
      login_hint?: string
      request?: string
      request_expiry?: number
      scope: string
    }
  | {
      [key: string]: unknown
    }

export type t_BcAuthorizeCustomAsBodySchema =
  | {
      binding_message?: string
      id_token_hint?: string
      login_hint?: string
      request?: string
      request_expiry?: number
      scope: string
    }
  | {
      [key: string]: unknown
    }

export type t_BcAuthorizeCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_CreateClientBodySchema = {
  application_type?: t_ApplicationType
  readonly client_id?: string
  readonly client_id_issued_at?: number
  client_name?: string
  readonly client_secret?: string | null
  readonly client_secret_expires_at?: number | null
  grant_types?: t_GrantType[]
  initiate_login_uri?: string
  jwks?: t_JsonWebKey[]
  jwks_uri?: string
  logo_uri?: string | null
  policy_uri?: string | null
  post_logout_redirect_uris?: string
  redirect_uris?: string[]
  request_object_signing_alg?: t_SigningAlgorithm[]
  response_types?: t_ResponseType[]
  token_endpoint_auth_method?: t_EndpointAuthMethod
  tos_uri?: string | null
}

export type t_DeleteClientParamSchema = {
  clientId: string
}

export type t_DeviceAuthorizeBodySchema = {
  client_id?: string
  scope?: string
}

export type t_DeviceAuthorizeCustomAsBodySchema = {
  client_id?: string
  scope?: string
}

export type t_DeviceAuthorizeCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_GenerateNewClientSecretParamSchema = {
  clientId: string
}

export type t_GetClientParamSchema = {
  clientId: string
}

export type t_GetWellKnownOAuthConfigurationCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_GetWellKnownOAuthConfigurationCustomAsQuerySchema = {
  client_id?: string
}

export type t_GetWellKnownOpenIdConfigurationQuerySchema = {
  client_id?: string
}

export type t_GetWellKnownOpenIdConfigurationCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_GetWellKnownOpenIdConfigurationCustomAsQuerySchema = {
  client_id?: string
}

export type t_IntrospectBodySchema = {
  token?: string
  token_type_hint?: t_TokenTypeHintIntrospect
}

export type t_IntrospectCustomAsBodySchema = {
  token?: string
  token_type_hint?: t_TokenTypeHintIntrospect
}

export type t_IntrospectCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_ListClientsQuerySchema = {
  after?: string
  limit?: number
  q?: string
}

export type t_LogoutQuerySchema = {
  id_token_hint: string
  post_logout_redirect_uri?: string
  state?: string
}

export type t_LogoutCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_LogoutCustomAsQuerySchema = {
  id_token_hint: string
  post_logout_redirect_uri?: string
  state?: string
}

export type t_OauthKeysQuerySchema = {
  client_id?: string
}

export type t_OauthKeysCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_ParBodySchema = {
  client_id?: string
  code_challenge?: string
  code_challenge_method?: string
  display?: string
  idp?: string
  idp_scope?: string
  login_hint?: string
  max_age?: number
  nonce?: string
  prompt?: string
  redirect_uri?: string
  request?: string
  response_mode?: string
  response_type?: string
  scope?: string
  sessionToken?: string
  state?: string
}

export type t_ParCustomAsBodySchema = {
  client_id?: string
  code_challenge?: string
  code_challenge_method?: string
  display?: string
  idp?: string
  idp_scope?: string
  login_hint?: string
  max_age?: number
  nonce?: string
  prompt?: string
  redirect_uri?: string
  request?: string
  response_mode?: string
  response_type?: string
  scope?: string
  sessionToken?: string
  state?: string
}

export type t_ParCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_ReplaceClientBodySchema = {
  application_type?: t_ApplicationType
  readonly client_id?: string
  readonly client_id_issued_at?: number
  client_name?: string
  readonly client_secret?: string | null
  readonly client_secret_expires_at?: number | null
  grant_types?: t_GrantType[]
  initiate_login_uri?: string
  jwks?: t_JsonWebKey[]
  jwks_uri?: string
  logo_uri?: string | null
  policy_uri?: string | null
  post_logout_redirect_uris?: string
  redirect_uris?: string[]
  request_object_signing_alg?: t_SigningAlgorithm[]
  response_types?: t_ResponseType[]
  token_endpoint_auth_method?: t_EndpointAuthMethod
  tos_uri?: string | null
}

export type t_ReplaceClientParamSchema = {
  clientId: string
}

export type t_RevokeBodySchema = {
  token?: string
  token_type_hint?: t_TokenTypeHintRevoke
}

export type t_RevokeCustomAsBodySchema = {
  token?: string
  token_type_hint?: t_TokenTypeHintRevoke
}

export type t_RevokeCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_TokenBodySchema = {
  grant_type?: t_GrantType
}

export type t_TokenCustomAsBodySchema = {
  grant_type?: t_GrantType
}

export type t_TokenCustomAsParamSchema = {
  authorizationServerId: string
}

export type t_UserinfoCustomAsParamSchema = {
  authorizationServerId: string
}
