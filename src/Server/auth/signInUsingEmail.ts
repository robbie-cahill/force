import { getUserID } from "Server/auth/getUserID"
import { gravityUnauthenticatedRequest } from "Server/auth/gravityUnauthenticatedRequest"

interface SignInUsingEmailProps {
  email: string
  password: string
  otp?: string
  headers: HeadersInit
}

export const signInUsingEmail = async ({
  email,
  password,
  otp,
  headers,
}: SignInUsingEmailProps) => {
  const res = await gravityUnauthenticatedRequest({
    path: `/oauth2/access_token`,
    method: "POST",
    headers,
    body: {
      email,
      oauth_provider: "email",
      otp_attempt: otp,
      password,
      grant_type: "credentials",
      client_id: process.env.ARTSY_ID,
      client_secret: process.env.ARTSY_SECRET,
      scope: "offline_access",
      // _csrf: Cookies.get("CSRF_TOKEN"),
    },
  })
  return res

  // TODO
  const gravityResponse = await res?.json()

  /**
   * Success
   */

  if (res?.status === 201) {
    const { expires_in, access_token } = gravityResponse
    const userId = await getUserID({ userAccessToken: "" })

    return {
      success: true,
      message: null,
      userAccessToken: access_token,
      userAccessTokenExpiresIn: expires_in,
      userID: userId,
    }
  }

  /**
   * Error
   */

  const { error_description: errorDescription } = gravityResponse

  switch (errorDescription) {
    case "missing two-factor authentication code":
      return {
        success: false,
        message: "otp_missing",
      }
    case "missing on-demand authentication code":
      return {
        success: false,
        message: "on_demand_otp_missing",
      }
    case "invalid two-factor authentication code":
      return {
        success: false,
        message: "invalid_otp",
      }
    default:
      return {
        success: false,
        message: "Unable to log in, please try again later",
      }
  }
}
