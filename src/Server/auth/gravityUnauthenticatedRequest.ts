import { getXAppToken } from "Server/auth/getXAppToken"

interface GravityUnauthenticatedRequestProps {
  path: string
  method?: "GET" | "PUT" | "POST" | "DELETE"
  body?: object
  headers?: RequestInit["headers"]
}

export const gravityUnauthenticatedRequest = async (
  payload: GravityUnauthenticatedRequestProps
) => {
  const xAppToken = await getXAppToken()

  try {
    const res = await fetch(`${process.env.API_URL}${payload.path}`, {
      method: payload.method || "GET",
      headers: {
        "X-Xapp-Token": xAppToken as string,
        Accept: "application/json",
        // https://nextjs.org/docs/messages/middleware-parse-user-agent
        "User-Agent": "Chrome", // TODO: getUserAgent(),
        ...payload.headers,
      },
      body: payload.body ? JSON.stringify(payload.body) : undefined,
    })
    console.log(await res?.json())
    return res
  } catch (error) {
    console.error("[gravityUnauthenticatedRequest]", error)
  }
}
