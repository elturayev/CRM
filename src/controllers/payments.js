import  ClientError from '../utils/errors.js'
import modelP from '../middlewares/models/paymentModel.js'
import modelS from '../middlewares/models/studentModel.js'

const GET = async (request, response, next) => {
	try {
		const { search } = request.query
		const paidUpdate = await modelP.paidUpdate()
		const paidSt = await modelP.paids(search)
		response.json(paidSt)
	} catch(error) {
		return next(error)
	}
}

const PUT = async (request, response, next) => {
	try {
		const { is_paid,student_name,teacher_id,group_id, payment_date } = request.body
		const student = await modelS.students(student_name)

		if(!(student.length > 0)) throw new ClientError(404,'Student not found!')
		const studentId = student[0].student_id
		const paidOff = await modelP.paidOff({is_paid, studentId, teacher_id,group_id, payment_date})
		if(paidOff[0].payment_date) {
			response.json({
				status: 201,
				message: 'Payment successfully paid off!'
			})
		}else throw new ClientError(404,'not payment')
	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	PUT
}