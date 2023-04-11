import qs from "qs"

export interface SignupCredentials {
  agreedToReceiveEmails?: boolean
  name: string
  email: string
  password: string
  recaptchaToken: string
  sessionId: string
  _csrf: string

  // 3rd-party oauth
  appleUid?: string // only if oauthProvider is apple
  accessToken?: string // only if oauthProvider is facebook or google
  idToken?: string // only if oauthProvider is apple
  oauthProvider: "email" | "facebook" | "google" | "apple"
}

/**
 * TODO:
 *  - 3rd party
 *  - Misc passport items (like tracking. See Eigen)
 */

export const signUp = async (credentials: SignupCredentials) => {
  const payload = {
    agreed_to_receive_emails: credentials.agreedToReceiveEmails,
    accepted_terms_of_service: true,
    email: credentials?.email,
    password: credentials?.password,
    grant_type: "credentials",
    client_id: process.env.ARTSY_ID,
    client_secret: process.env.ARTSY_SECRET,
    recaptcha_token: credentials.recaptchaToken,
    session_id: credentials.sessionId,

    // 3rd-party oauth
    provider: "email", // oauthProvider,
    oauth_token:
      credentials.oauthProvider === "facebook" ||
      credentials.oauthProvider === "google"
        ? credentials.accessToken
        : undefined,
    apple_uid:
      credentials.oauthProvider === "apple" ? credentials.appleUid : undefined,
    id_token:
      credentials.oauthProvider === "apple" ? credentials.idToken : undefined,
    _csrf: credentials?._csrf,
  }

  const xAppTokenURL = `${process.env.API_URL}/api/v1/xapp_token?${qs.stringify(
    {
      client_id: process.env.ARTSY_ID,
      client_secret: process.env.ARTSY_SECRET,
    }
  )}`

  const xAppTokenRes = await fetch(xAppTokenURL)
  const xAppTokenResponse = await xAppTokenRes.json()

  const signUpReqReq = await fetch(`${process.env.API_URL}/api/v1/user`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Xapp-Token": xAppTokenResponse.xapp_token as string,
      "X-Requested-With": "XMLHttpRequest",
    },
  })

  const accessTokenRes = await signUpReqReq.json()

  if (!signUpReqReq.ok) {
    throw new Error(accessTokenRes.error_description)
  }

  if (signUpReqReq.ok && accessTokenRes) {
    const userReq = await fetch(`${process.env.API_URL}/api/v1/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": accessTokenRes.access_token as string,
      },
    })

    const userRes = await userReq.json()

    const user = {
      ...accessTokenRes,
      ...userRes,
    }

    return user
  }

  return null
}
