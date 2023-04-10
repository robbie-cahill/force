import { gravityUnauthenticatedRequest } from "Server/auth/gravityUnauthenticatedRequest"

interface GetUserIDProps {
  userAccessToken?: string
}

export const getUserID = async ({ userAccessToken }: GetUserIDProps) => {
  try {
    const user = await gravityUnauthenticatedRequest({
      path: `/api/v1/me`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": userAccessToken as string,
      },
    })

    const userResponse = await user?.json()

    return userResponse.id
  } catch (error) {
    console.error("[getUserID] error: ", error)
  }
}
