import Controller from "@/core/shared/controller"
import { badRequest, ok } from "@/core/shared/http-helper"
import Request from "@/core/shared/request"
import Response from "@/core/shared/response"
import RegisterUser from "@/core/user/service/registerUser"

export default class RegisterUserController implements Controller {
  private readonly useCase: RegisterUser

  constructor(useCase: RegisterUser) {
    this.useCase = useCase
  }

  async handle(request: Request): Promise<Response> {
    try {
      const user = await this.useCase.execute({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      })

      return ok(user)
    } catch (error: any) {
      return badRequest(error.message)
    }
  }
}
