import  ClientError  from '../utils/errors.js'
import Joi from 'joi'

const schema = Joi.object({
	username: Joi.string().min(3).max(60).required(),
	phone: Joi.string().pattern(new RegExp(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/)).required()
})

const validTeacher = (request, response, next) => {
	try {
		if(!request.files) throw new ClientError(404,'File must be entered!')
		
		const { file } = request.files
		const { teacher_name, teacher_phone } = request.body

		const newTeacher = {
			username: teacher_name,
			phone: teacher_phone
		}

		const { error, value } = schema.validate(newTeacher)

		if(error) throw new ClientError(400,error.details[0].message)
		if(file.size > 10 * 1024 * 1024) throw new ClientError(413,'File size exceeded 10 mb!')
		if(!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
			throw new ClientError(414,'File format .jpg, .png or .must be jpeg')
		}

		return next()
	} catch(error) {
		return next(error)
	}
}



const validStudent = (request, response, next) => {
	try {
		if(!request.files) throw new ClientError(404,'File must be entered!')
		
		const { file } = request.files
		const { 
			student_name,
			student_phone,
			parents_name,
			parents_phone 
		} = request.body

		const newStudent = {
			username: student_name,
			phone: student_phone
		}

		const newParents = {
			username: parents_name,
			phone: parents_phone
		}

		const { error, value } = schema.validate(newStudent)
		const validation = schema.validate(newParents)

		if(error) throw new ClientError(400,error.details[0].message)
		if(validation.error) throw new ClientError(400,validation.error.details[0].message)
		if(file.size > 10 * 1024 * 1024) throw new ClientError(413,'File size exceeded 10 mb!')
		if(!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
			throw new ClientError(414,'File format .jpg, .png or .must be jpeg')
		}

		return next()
	} catch(error) {
		return next(error)
	}
}



export default {
	validTeacher,
	validStudent
}