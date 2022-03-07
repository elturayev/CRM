import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
const PORT = process.env.PORT || 4000

const app = express()

import '../config.js'

import studentRouter from './routers/students.js'
import teacherRouter from './routers/teachers.js'
import paymentRouter from './routers/payments.js'

app.use(express.json())
app.use(fileUpload())
app.use('/images',express.static(path.join(process.cwd(), 'src', 'files')))

app.use('/students',studentRouter)
app.use('/teachers',teacherRouter)
app.use('/payments',paymentRouter)

app.use((error,request,response,next)=>{
	if([400,401,404,413,415].includes(error.status)){
		return response.status(error.status).send(error)
	}
})

app.listen(PORT, ()=> console.log('Backend server is running on http://localhost:' + PORT))