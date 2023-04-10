"use client"

import { Button } from "@artsy/palette"
import { Test } from "Components/Test"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const session = useSession()
  const router = useRouter()

  if (session.status === "unauthenticated") {
    return (
      <Button
        variant="primaryBlack"
        onClick={() => router.push("/auth/sign-in")}
      >
        Sign in
      </Button>
    )
  }
  return (
    <>
      <Button variant="primaryBlack" onClick={() => signOut()}>
        Sign out
      </Button>
      <Test />
    </>
  )
}
