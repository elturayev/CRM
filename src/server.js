import express from 'express'
import fileUpload from 'express-fileupload'

const PORT = process.env.PORT || 4000

const app = express()

import '../config.js'

import studentRouter from './routers/students.js'
import teacherRouter from './routers/teachers.js'

app.use(express.json())
app.use(fileUpload())

app.use('/students',studentRouter)
app.use('/teachers',teacherRouter)

app.listen(PORT, ()=> console.log('Backend server is running on http://localhost:' + PORT))