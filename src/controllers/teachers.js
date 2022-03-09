import  ClientError  from '../utils/errors.js'
import modelT from '../middlewares/models/teacherModel.js'
import modelS from '../middlewares/models/studentModel.js'

const GET = async (request, response, next) => {
	try {
		const teacher = await modelT.teachers()
		const students = await modelS.students()
		for(let i of teacher){
			const isPaid = []
			const studentAll = []
			for(let j of students){
				if((i.teacher_name == j.teacher_name) &&
					(i.group_name == j.group_name) &&
					j.is_paid){
					isPaid.push(j)
				}
				if((i.teacher_name == j.teacher_name) &&
					(i.group_name == j.group_name)){
					studentAll.push(j)
				}
			}
			i.isPaid = isPaid
			i.studentAll = studentAll
		}
		response.json(teacher)
	} catch(error) {
		return next(error)
	}
}


const POST =  async(request, response, next) => {
	try {
		const { file } = request.files
		const teacher_profile_img = file.name.replace(/\s/g, '')
		const { teacher_name,
				teacher_phone,
				lesson_days,
				lesson_hours,
				group_id 
			} = request.body
		const addT = await modelT.addT({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id})
		file.mv(path.join(process.cwd(), 'src', 'files', teacher_profile_img))
		
		response.json({
			status: 201,
			message: 'Teacher successfully added!',
			data: addT
		})
	} catch(error) {
		return next(error)
	}
}


const DELETE = async (request, response, next) => {
	try {
		const { teacher_id } = request.query
		const teacherDelete = await modelT.teacherDel(teacher_id)
		if (teacherDelete.length > 0){
			response.json({
				status: 200,
				message: 'Teacher has been deleted!'
			})
		} else throw new ClientError(404, 'Teacher not found!')
	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST,
	DELETE
}