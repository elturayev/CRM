import model from '../middlewares/models/attendanceModel.js'

const GET = async (request, response, next) => {
	try {
		const attendancesDelete = await model.deleteAttendances()
		const attendances = await model.attendances()
		response.json(attendances)
	} catch(error) {
		return next(error)
	}
}


const POST = (request, response, next) => {
	try {

		const { group_id, teacher_id, students } = request.body

		students.map( async (student) => {
			if(student.status) {
				await model.addAttendances({
					attendance_date: new Date().toLocaleDateString('uz-UZ'),
					incoming_date: null, 
					student_id: student.student_id,
					teacher_id,
					group_id})
			}
			else {
				await model.addAttendances({
					attendance_date: new Date().toLocaleDateString('uz-UZ'),
					incoming_date: new Date().toLocaleDateString('uz-UZ'), 
					student_id: student.student_id,
					teacher_id,
					group_id})
			}
			return student
		})

	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST
}