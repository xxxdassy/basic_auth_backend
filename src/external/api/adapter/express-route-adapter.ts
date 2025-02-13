import Controller from "@/core/shared/controller"
import { Request, Response } from "express"

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = { body: req.body }
    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
