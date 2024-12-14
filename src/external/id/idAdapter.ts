import Id from "@/core/infra/id"
import { v4 as uuid } from "uuid"

export default class IdAdapter implements Id {
  generate(): string {
    return uuid()
  }
}
