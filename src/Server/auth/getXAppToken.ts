import qs from "qs"

let xAppTokenState = {
  xAppToken: "",
  xApptokenExpiresIn: "",
}

export const getXAppToken = async () => {
  const { xAppToken, xApptokenExpiresIn } = xAppTokenState

  if (
    xAppToken &&
    xApptokenExpiresIn &&
    new Date() < new Date(xApptokenExpiresIn)
  ) {
    return xAppToken
  }

  const tokenURL = `${process.env.API_URL}/api/v1/xapp_token?${qs.stringify({
    client_id: process.env.ARTSY_ID,
    client_secret: process.env.ARTSY_SECRET,
  })}`

  try {
    const res = await fetch(tokenURL, {
      headers: {
        // TODO:
        // https://nextjs.org/docs/messages/middleware-parse-user-agent
        "User-Agent": "Chrome",
      },
    })

    const response = await res.json()

    xAppTokenState = {
      xAppToken: response.xapp_token,
      xApptokenExpiresIn: response.expires_in,
    }
    return xAppTokenState.xAppToken
  } catch (error) {
    console.error("[getXAppToken] Error", error)
  }
}
