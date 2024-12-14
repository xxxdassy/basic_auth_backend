import { Nullable, Optional } from "@/core/common/type/CommonTypes"
import User from "../model/user"

export default interface UserRepository {
  add(input: User): Promise<void>
  searchByEmail(value: string): Promise<Nullable<User>>
  findUser(by: { id?: string; email?: string }): Promise<Nullable<User>>
}
