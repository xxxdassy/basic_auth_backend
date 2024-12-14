// Na Arquitetura Hexagonal, isso e uma porta
// A porta faz parte do core da sua aplicacao
export default interface Encrypter {
  encrypt(value: string): Promise<string>
  compare(passsword: string, hashedPassword: string): Promise<boolean>
}
