import { get } from "Utils/get"

export function principalFieldErrorHandlerMiddleware() {
  return next => async req => {
    const res = await next(req)
    const statusCode = get(
      res,
      r => r.json.extensions.principalField.httpStatusCode
    )

    if (statusCode) {
      throw new HttpError(statusCode)
    } else {
      return res
    }
  }
}

export default class HttpError {
  isFoundHttpError = true

  status: number

  data: any

  constructor(status: number, data?: any) {
    this.status = status
    this.data = data
  }
}
