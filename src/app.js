const express =require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('common'))

const userRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const { verifyJWT } = require("./middleware/verifyJWT")

app.get("/health", (req, res) => {
  res.status(200).send("Ok.")
})

app.use("/v1/api", authRouter)

app.use(verifyJWT)
app.use("/v1/api", userRouter)


module.exports = app
