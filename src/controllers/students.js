import ClientError  from '../utils/errors.js'
import model from '../middlewares/model.js'
import path from 'path'

const GET = async (request, response, next ) => {
	try {
		const data = await model.students()
		response.json(data)
	} catch(error) {
		return next(error)
	}
}

const POST = async (request, response, next) => {
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
		file.mv(path.join(process.cwd(), 'src', 'files', student_profile_img))
		response.json(students)
			
	} catch(error) {
		return next(error)
	}
}

const DELETE = async (request, response, next) => {
	try {
		const { student_id } = request.query
		const studentDelete = await model.studentDel(student_id)
		if (studentDelete.length > 0){
			response.json({
				status: 200,
				message: 'Student has been deleted!'
			})
		} else throw new ClientError(404,'Student not found!')
	} catch(error) {
		return next(error)
	}
}


export default {
	GET,
	POST,
	DELETE
}