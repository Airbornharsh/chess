import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/DBConfig'
import { RouterInit } from './routes/init'

const app = express()
const router = express.Router()
dotenv.config()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api', router)

RouterInit(router)

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
