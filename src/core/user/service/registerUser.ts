import UseCase from "@/core/shared/useCase"
import User from "../model/user"
import UserRepository from "./userRepository"
import EmailValidator from "@/core/infra/emailValidator"
import Encrypter from "@/core/infra/encrypter"
import Id from "@/core/infra/id"

export default class RegisterUser implements UseCase<User, void> {
  private emailValidator: EmailValidator
  private userRepository: UserRepository
  private encrypter: Encrypter
  private id: Id

  constructor(
    encrypter: Encrypter,
    emailValidator: EmailValidator,
    userRepository: UserRepository,
    id: Id,
  ) {
    this.emailValidator = emailValidator
    this.userRepository = userRepository
    this.encrypter = encrypter
    this.id = id
  }

  async execute(input: any): Promise<void> {
    const requiredFields = ["name", "email", "password"]

    for (const field of requiredFields) {
      if (!input[field]) {
        throw new Error(`missing ${field}`)
      }
    }

    const emailVerify = await this.emailValidator.validate(input.email)
    const searchByEmail = await this.userRepository.searchByEmail(input.email)

    if (!emailVerify) throw new Error("invalid email!")
    if (searchByEmail) throw new Error("email already exists!")

    const hashedPassword = await this.encrypter.encrypt(input.password)

    const user = {
      ...input,
      password: hashedPassword,
      id: this.id.generate(),
    }

    await this.userRepository.add(user)

    return user
  }
}
