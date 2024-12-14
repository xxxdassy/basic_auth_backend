import { Nullable } from "@/core/common/type/CommonTypes"
import {
  HttpJwtPayload,
  HttpLoggedInUser,
  HttpUserPayload,
} from "./type/HttpAuthTypes"
import UserRepository from "@/core/user/service/userRepository"
import Encrypter from "@/core/infra/encrypter"
import User from "@/core/user/model/user"
import jwt from "jsonwebtoken"

const secret = "kkkkkkkkkkkkkkkkk"

export default class HttpAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypt: Encrypter,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<Nullable<HttpUserPayload>> {
    const user: Nullable<User> = await this.userRepository.searchByEmail(email)

    if (user) {
      const isValidPassword = await this.encrypt.compare(
        password,
        user.password,
      )
      if (isValidPassword) {
        return {
          id: user.id,
          email: user.email,
        }
      }
    }

    return null
  }

  public login(user: HttpUserPayload): HttpLoggedInUser {
    const payload: HttpJwtPayload = { id: user.id }

    return {
      id: user.id,
      accessToken: jwt.sign(payload, secret, { expiresIn: "1h" }),
    }
  }

  public async getUser(by: {
    id: string
    email: string
  }): Promise<Nullable<User>> {
    return this.userRepository.findUser(by)
  }
}
