import bcrypt from "bcrypt"
import Encrypter from "@/core/infra/encrypter"

// Na Arquitetura Hexagonal, e um Adapter
// O Adaptador nao faz parte do core
export default class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(passsword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(passsword, hashedPassword)
  }
}
