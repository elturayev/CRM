import model from '../middlewares/models/attendanceModel.js'

const GET = async (request, response, next) => {
	try {

		const attendancesDelete = await model.deleteAttendances()
		const attendances = await model.attendances()
		
		response.json(attendances)
		return next()
	} catch(error) {
		return next(error)
	}
}


const POST = async (request, response, next) => {
	try {
 
		const { group_id, teacher_id, students } = request.body
		const validAt = await model.validAttendances({ teacher_id, group_id })

		if(validAt.length > 0){
			students.map( async (student) => {
				if(student.status) {
					await model.updateAttendances({
						attendance_date: new Date(),
						incoming_date: null, 
						student_id: student.student_id,
						teacher_id,
						group_id})
	
				} else {
					await model.updateAttendances({
						attendance_date: new Date(),
						incoming_date: new Date(), 
						student_id: student.student_id,
						teacher_id,
						group_id})
				}
				return student
			})
		} else {
			students.map( async (student) => {
				if(student.status) {
					await model.addAttendances({
						attendance_date: new Date(),
						incoming_date: null, 
						student_id: student.student_id,
						teacher_id,
						group_id})
	
				} else {
					await model.addAttendances({
						attendance_date: new Date(),
						incoming_date: new Date(), 
						student_id: student.student_id,
						teacher_id,
						group_id})
				}
				return student
			})
		}

		response.json({
			status: 201,
			message: 'Attendance successfully added!'
		})
		return next()
	} catch(error) {
		return next(error)
	}
}


export default {
	GET,
	POST
}