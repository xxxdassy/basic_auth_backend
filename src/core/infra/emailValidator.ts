export default interface EmailValidator {
  validate(value: string): Promise<boolean>
}
