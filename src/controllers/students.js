import model from '../middlewares/model.js'

const GET = async (request, response ) => {
	try {
		const data = await model.students()
		response.json(data)
	} catch(error) {
		console.log(error)
	}
}

const POST = async (request, response) => {
	try {
		const  { file } = request.files
		const student_profile_img = file.name.replace(/\s/g, '')
		const { student_name,
				student_phone,
				parents_name,
				parents_phone,
				group_id
			} = request.body

			const createSt = await model.addSt({student_name,student_phone,parents_name,parents_phone,student_profile_img})
			const searchTId = await model.teacherId(group_id)
			const studentId = createSt[0].student_id
			const teacherId = searchTId[0].teacher_id
			const addStudent = await model.addPSt({studentId, teacherId, group_id})
			const students = await model.students()
			response.json(students)
			
	} catch(error) {
		console.log(error)
	}
}

const DELETE = async (request, response) => {
	try {
		const { student_id } = request.query
		const studentDelete = await model.studentDel(student_id)
		if (studentDelete.length > 0){
			response.json({
				status: 200,
				message: 'Student has been deleted!'
			})
		} else {
			response.json({
				status: 404,
				message: 'Student not found!'
			})
		}
	} catch(error) {
		console.log(error)
	}
}


export default {
	GET,
	POST,
	DELETE
}