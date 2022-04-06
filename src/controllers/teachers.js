import  ClientError  from '../utils/errors.js'
import modelT from '../middlewares/models/teacherModel.js'
import modelS from '../middlewares/models/studentModel.js'
import modelG from '../middlewares/models/groupModel.js'
import path from 'path'
import fs from 'fs'

const GET = async (request, response, next) => {
	try {

		const { search } = request.query
		const { teacher_id } = request.params
		const teacher = await modelT.teachers(search, teacher_id)
		const students = await modelS.students({},1,10000)
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
		return next()
	} catch(error) {
		return next(error)
	}
}


const POST =  async(request, response, next) => {
	try {

		const { file } = request.files
		const { teacher_name,
				teacher_phone,
				lesson_days,
				lesson_hours,
				group_id 
			} = request.body
		
		const teacher_profile_img = Date.now() + file.name.replace(/\s/g, '')
		const teachersAll = await modelT.teacherId(group_id)

		if(teachersAll.length > 0) throw new ClientError(400,'This group has teacher!')

		const addT = await modelT.addT({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id})
		
		if(!addT) throw new ClientError(400, 'Teacher failed added!')

		const activeGroup = await modelG.changeActive(group_id)
		file.mv(path.join(process.cwd(), 'src', 'files', teacher_profile_img))
		
		response.json({
			status: 201,
			message: 'Teacher successfully added!',
			data: addT
		})
		return next()
	} catch(error) {
		return next(error)
	}
}


const DELETE = async (request, response, next) => {
	try {
		
		const { teacher_id } = request.query
		
		const teacher = await modelT.teachers(null, teacher_id)
		const teacherDelete = await modelT.teacherDel(teacher_id)
		const activeGroup =  await modelG.change(teacher[0].group_id)
		
		if (teacherDelete.length > 0){
			response.json({
				status: 200,
				message: 'Teacher has been deleted!'
			})
		} else throw new ClientError(404, 'Teacher not found!')
		
		return next()
	} catch(error) {
		return next(error)
	}
}

const PUT = async (request, response, next) => {
	try {

		const { teacher_id } = request.query

		const { file } = request.files

		const { teacher_name,
				teacher_phone,
				lesson_days,
				lesson_hours,
				group_id 
			} = request.body
		
		const teacher_profile_img = Date.now() + file.name.replace(/\s/g, '')
		const teacher = await modelT.teacherId(group_id, teacher_id)
		
		if(teacher.length) {

			const changeTeacher = await modelT.changeTeacher({ 
				teacher_id,
				teacher_name, 
				teacher_phone, 
				lesson_days, 
				lesson_hours, 
				teacher_profile_img, 
				group_id 
			})

			if(changeTeacher.length) {
				response.json({
					status: 200,
					message: 'Teacher successfully updated!'
				})
			} else throw new ClientError(400, 'Teacher failed updated!')

			file.mv(path.join(process.cwd(), 'src', 'files', teacher_profile_img ))

			fs.unlink(path.join(process.cwd(), 'src', 'files', teacher[0].teacher_profile_img), (err) => {
				if(err) {
					throw new ClientError(404,'File not found!')
				}
			})

		} else throw new ClientError(404, 'Teacher or group not found!')
		
		return next()
	} catch(error) {
		return next(error)
	}
}


export default {
	GET,
	POST,
	PUT,
	DELETE
}