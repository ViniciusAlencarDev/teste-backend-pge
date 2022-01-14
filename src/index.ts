require('dotenv').config()
import express from 'express'
const app = express()
import cors from 'cors'

app.use(express.json())
app.use(cors())

const protocol = process.env.PROTOCOL || 'http'
const ip = require('ip').address()
const port = process.env.PORT || 3030

import routes from './routes'
app.use(routes)

app.listen(port, () => console.log(`Server started in http://localhost:${port} or ${protocol}://${ip}:${port}`))
