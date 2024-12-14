import EmailValidator from "@/core/infra/emailValidator"
import validator from "validator"

export default class EmailValidatorAdapter implements EmailValidator {
  async validate(value: string): Promise<boolean> {
    return validator.isEmail(value)
  }
}
