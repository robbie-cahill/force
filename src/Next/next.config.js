const { bootstrapEnv } = require("./src/system/env")

const env = bootstrapEnv()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env.serverEnv,
  experimental: {
    appDir: true,
    externalDir: true,
  },
  compiler: {
    relay: {
      src: "./src",
      artifactDirectory: "../__generated__",
      language: "typescript",
    },
    styledComponents: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          tls: false,
          assert: false,
          process: false,
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
