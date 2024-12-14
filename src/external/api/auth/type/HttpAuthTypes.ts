export type HttpUserPayload = {
  id: string
  email: string
}

export type HttpJwtPayload = {
  id: string
}

export type HttpLoggedInUser = {
  id: string
  accessToken: string
}
