import LoginUser from "@/core/user/service/loginUser"
import LoginUserController from "../controllers/loginUser.controller"
import PrismaAdapter from "@/external/repository/user.repository"
import { repository } from "@/external/repository/utils/repositoryClient"
import BcryptAdapter from "@/external/criptography/bcrypt-adapter"
import HttpAuthService from "../auth/HttpAuthService"

export default function makeLoginUserController() {
  const salt = 12
  const makeEncrypter = new BcryptAdapter(salt)
  const makeUserRepository = new PrismaAdapter(repository)
  const makeHttpAuthService = new HttpAuthService(
    makeUserRepository,
    makeEncrypter,
  )
  const makeLoginUser = new LoginUser(makeHttpAuthService)
  return new LoginUserController(makeLoginUser)
}
