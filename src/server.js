import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(fileUpload())
app.use(cors())

import '../config.js'

// Router
import authRouter from './routers/auth.js'
import studentRouter from './routers/students.js'
import teacherRouter from './routers/teachers.js'
import paymentRouter from './routers/payments.js'
import attendanceRouter from './routers/attendances.js'

// Static
app.use('/images',express.static(path.join(process.cwd(), 'src', 'files')))

// Routes
app.use('/auth', authRouter)
app.use('/students',studentRouter)
app.use('/teachers',teacherRouter)
app.use('/payments',paymentRouter)
app.use('/attendances',attendanceRouter)


// errorHandler
app.use((error,request,response,next)=>{
	if([400,401,404,413,415].includes(error.status)){
		return response.status(error.status).send(error)
	}
	else {
		return response.send(error)
	}
})

app.listen(PORT, ()=> console.log('Backend server is running on http://localhost:' + PORT))