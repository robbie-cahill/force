// pages/api/example.js

import nc from "next-connect"
import cors from "cors"
import { signInUsingEmail } from "Server/auth/signInUsingEmail"
import { NextResponse } from "next/server"

export default async function handler(req, res) {
  const response = await signInUsingEmail({
    email: req.body.email,
    password: req.body.password,
    otp: req.body.otp_attempt,
    otpRequired: req.body.otpRequired,
    headers: req.body.headers,
  })
  const resJson = await response?.json()

  res.status(200).json(resJson)
}

// const handler = nc()
//   .use(cors())
//   .post(async (req, res) => {
//     try {
//       const response = await signInUsingEmail({
//         email: req.body.email,
//         password: req.body.password,
//         otp: req.body.otp_attempt,
//         otpRequired: req.body.otpRequired,
//         headers: req.body.headers,
//       })
//       const resJson = await response?.json()
//       console.log(resJson)
//       return NextResponse.json(resJson)
//     } catch (error) {
//       console.error(error)
//     }
//   })

// export default handler
