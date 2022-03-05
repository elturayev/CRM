import express from 'express'

const PORT = process.env.PORT || 4000

const app = express()

import '../config.js'

import studentRouter from './routers/students.js'

app.use('/students',studentRouter)

app.listen(PORT, ()=> console.log('Backend server is running on http://localhost:' + PORT))