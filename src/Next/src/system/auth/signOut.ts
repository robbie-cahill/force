import { getSession } from "next-auth/react"
import { headers } from "next/headers"
import Cookies from "cookies-js"

export const signOut = async () => {
  const session = await getSession()

  await fetch(`${process.env.API_URL}/api/v1/access_token`, {
    headers: {
      Accept: "application/json",
      "X-Access-Token": session?.user.access_token as string,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "DELETE",
    credentials: "same-origin",
  })

  return await fetch("/api/auth/signout?callbackUrl=/api/auth/session", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: await fetch("/api/auth/csrf").then(rs => rs.text()),
  })
}
