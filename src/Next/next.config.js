/** @type {import('next').NextConfig} */
const nextConfig = {
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
