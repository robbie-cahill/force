"use client"

import { Button, Text } from "@artsy/palette"
import { Test } from "Components/Test"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const session = useSession()
  const router = useRouter()

  if (session.status === "unauthenticated") {
    return <Text>Signed out </Text>
  }
  return (
    <>
      <Text>Signed in</Text>
      <Button variant="primaryBlack" onClick={() => signOut()}>
        Sign out
      </Button>
      <Test />
    </>
  )
}
