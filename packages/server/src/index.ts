import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
