import RegisterUser from "@/core/user/service/registerUser"
import RegisterUserController from "@/external/api/controllers/registerUser.controller"
import BcryptAdapter from "@/external/criptography/bcrypt-adapter"
import EmailValidatorAdapter from "@/external/emailValidator/emailValidator"
import PrismaAdapter from "@/external/repository/user.repository"
import { repository } from "@/external/repository/utils/repositoryClient"
import IdAdapter from "@/external/id/idAdapter"

export default function makeRegisterUserController() {
  const salt = 12
  const makeEncrypter = new BcryptAdapter(salt)
  const makeEmailValidator = new EmailValidatorAdapter()
  const makeUserRepository = new PrismaAdapter(repository)
  const makeId = new IdAdapter()
  const makeRegisterUser = new RegisterUser(
    makeEncrypter,
    makeEmailValidator,
    makeUserRepository,
    makeId,
  )
  return new RegisterUserController(makeRegisterUser)
}
