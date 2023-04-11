import qs from "qs"

export const fetchXAppToken = async () => {
  const tokenUrl = `${process.env.API_URL}/api/v1/xapp_token?${qs.stringify({
    client_id: process.env.ARTSY_ID,
    client_secret: process.env.ARTSY_SECRET,
  })}`

  const tokenReq = await fetch(tokenUrl)
  const tokenRes = await tokenReq.json()

  return {
    xAppToken: tokenRes.xapp_token,
  }
}
