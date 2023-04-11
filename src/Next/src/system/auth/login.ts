import { fetchXAppToken } from "Next/src/system/auth/fetchXAppToken"
import qs from "qs"

export interface LoginCredentials {
  email: string
  password: string
  otpAttempt: string
  otpRequired: string
  sessionId: string
  _csrf: string
}

export const login = async (credentials: LoginCredentials): Promise<any> => {
  const payload = {
    email: credentials.email,
    password: credentials.password,
    otp_attempt: credentials.otpAttempt,
    otpRequired: credentials.otpRequired,
    session_id: credentials.sessionId,
    grant_type: "credentials",
    client_id: process.env.ARTSY_ID,
    client_secret: process.env.ARTSY_SECRET,
    _csrf: credentials._csrf,
  }

  const { xAppToken } = await fetchXAppToken()

  const accessTokenReq = await fetch(
    `${process.env.API_URL}/oauth2/access_token`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Xapp-Token": xAppToken,
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  )

  const accessTokenRes = await accessTokenReq.json()

  if (!accessTokenReq.ok) {
    throw new Error(accessTokenRes.error_description)
  }

  if (accessTokenReq.ok && accessTokenRes) {
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
