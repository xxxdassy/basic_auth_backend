import { Nullable } from "@/core/common/type/CommonTypes"
import User from "@/core/user/model/user"
import UserRepository from "@/core/user/service/userRepository"
import { PrismaClient } from "@prisma/client"

export default class PrismaAdapter implements UserRepository {
  private repository: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.repository = prismaClient
  }

  async add(input: User): Promise<void> {
    await this.repository.user.create({
      data: { ...input, createdAt: new Date() },
    })
  }

  async searchByEmail(value: string): Promise<Nullable<User>> {
    return await this.repository.user.findFirst({ where: { email: value } })
  }

  async findUser(by: {
    id?: string | undefined
    email?: string | undefined
  }): Promise<Nullable<User>> {
    const fields = ["id", "email"]

    for (const field of fields) {
      switch (field) {
        case "id":
          return await this.repository.user.findFirst({
            where: { id: by.id },
          })
        case "email":
          return await this.repository.user.findFirst({
            where: { email: by.email },
          })
      }
    }

    return null
  }
}
