import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/DBConfig'

const app = express()
dotenv.config()

app.use(cors())

connectDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
