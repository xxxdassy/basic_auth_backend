import UseCase from "@/core/shared/useCase"
import { Optional } from "@/core/common/type/CommonTypes"
import HttpAuthService from "@/external/api/auth/HttpAuthService"
import { HttpLoggedInUser } from "@/external/api/auth/type/HttpAuthTypes"

export default class LoginUser
  implements
    UseCase<{ email: string; password: string }, Optional<HttpLoggedInUser>>
{
  private readonly httpAuthService: HttpAuthService

  constructor(httpAuthService: HttpAuthService) {
    this.httpAuthService = httpAuthService
  }

  async execute(input: {
    email: string
    password: string
  }): Promise<Optional<HttpLoggedInUser>> {
    const validate = await this.httpAuthService.validateUser(
      input.email,
      input.password,
    )

    if (!validate) {
      throw new Error("User does not exist!")
    }

    return this.httpAuthService.login(validate)
  }
}
