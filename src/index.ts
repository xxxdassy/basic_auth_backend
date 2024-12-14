import { repository } from "@/external/repository/utils/repositoryClient"
import express from "express"
import makeRegisterUserController from "./external/api/factories/registerUserController.factorie"
import { adaptRoute } from "./external/api/adapter/express-route-adapter"
import makeLoginUserController from "./external/api/factories/loginUserController.factorie"

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/add", adaptRoute(makeRegisterUserController()))
app.post("/login", adaptRoute(makeLoginUserController()))

repository
  .$connect()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running to port: ${port}, 🔥🔥🔥🔥`)
    })
    console.log("Connected to database!")
  })
  .catch(console.error)
