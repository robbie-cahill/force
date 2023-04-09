import { getAsyncLocalStorage } from "Server/asyncLocalWrapper"
// eslint-disable-next-line no-restricted-imports
import { GlobalData, data as sd } from "sharify"

export function getENV(ENV_VAR: keyof GlobalData) {
  let envVar
  if (typeof window === "undefined") {
    if (process.env.NEXTJS) {
      envVar = process.env[ENV_VAR]
    } else {
      const asyncLocalStorage = getAsyncLocalStorage()
      envVar =
        asyncLocalStorage.getStore()?.get(ENV_VAR) || process.env[ENV_VAR]
    }
  } else {
    if (window?.process?.env.NEXTJS) {
      envVar = window.process?.env[ENV_VAR]
    } else {
      envVar = sd[ENV_VAR]
    }
  }

  return envVar
}
