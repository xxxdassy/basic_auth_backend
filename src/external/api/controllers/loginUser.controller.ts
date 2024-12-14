import Controller from "@/core/shared/controller"
import { badRequest, ok } from "@/core/shared/http-helper"
import Request from "@/core/shared/request"
import Response from "@/core/shared/response"
import LoginUser from "@/core/user/service/loginUser"

export default class LoginUserController implements Controller {
  constructor(private readonly useCase: LoginUser) {}

  async handle(request: Request): Promise<Response> {
    try {
      const user = await this.useCase.execute(request.body)

      return ok(user)
    } catch (error: any) {
      return badRequest(error.message)
    }
  }
}
