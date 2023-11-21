import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes/routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.use(express.static('public'))

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on ${process.env.PORT}`)
})
