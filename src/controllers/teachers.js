import model from '../middlewares/model.js'

const GET = async (request, response) => {
	try {
		const teacher = await model.teachers()
		const students = await model.students()
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
		console.log(error)
	}
}


const POST =  async(request, response) => {
	try {
		const { file } = request.files
		const teacher_profile_img = file.name.replace(/\s/g, '')
		const { teacher_name,
				teacher_phone,
				lesson_days,
				lesson_hours,
				group_id 
			} = request.body
		const addT = await model.addT({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id})
		response.json({
			status: 201,
			message: 'Teacher successfully added!',
			data: addT
		})
	} catch(error) {
		console.log(error)
	}
}


export default {
	GET,
	POST
}