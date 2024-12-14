import Request from "./request"
import Response from "./response"

export default interface Controller {
  handle(request: Request): Promise<Response>
}
