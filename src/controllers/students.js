import ClientError  from '../utils/errors.js'
import modelS from '../middlewares/models/studentModel.js'
import modelT from '../middlewares/models/teacherModel.js'
import modelStatistic from '../middlewares/models/statisticModel.js'
import { PAGINATION } from '../../config.js'
import path from 'path'


const GET = async (request, response, next ) => {
	try {

		const { params } = request.params
		const { search, page = PAGINATION.page, limit = PAGINATION.limit } = request.query
		if(params == 'deletedStudents'){
			const controlDelSt = await modelS.controlDelSt()
			const dataDelSt = await modelS.deleteSt()
			response.json(dataDelSt)
		}
		else if(params == 'statistics'){
			const totalGr = await modelStatistic.totalGroups()
			const totalT = await modelStatistic.totalTeachers()
			
			const statisticsSt = await modelStatistic.statistics()
			statisticsSt.push([totalT[0],totalGr[0]])
			response.json(statisticsSt)
		}
		else {
			const dataSt = await modelS.students(search, page, limit)
			response.json(dataSt)
		}

		return next()
	} catch(error) {
		return next(error)
	}
}


const POST = async (request, response, next) => {
	try {

		const  { file } = request.files
		const { student_name,
				student_phone,
				parents_name,
				parents_phone,
				group_id
			} = request.body

		const student_profile_img = file.name.replace(/\s/g, '')
		const validSt = await modelS.validSt({ student_phone, group_id  })
		if(validSt.length > 0) throw new ClientError(400, 'This user is available!')
		const createSt = await modelS.addSt({student_name,student_phone,parents_name,parents_phone,student_profile_img})
		const studentId = createSt[0].student_id


		const searchTId = await modelT.teacherId(group_id)
		const teacherId = searchTId[0].teacher_id
		const addStudent = await modelS.addPSt({studentId, teacherId, group_id})
		
		file.mv(path.join(process.cwd(), 'src', 'files', student_profile_img))
		
		const totalSt = await modelStatistic.totalStudents()
		const validTotal = await modelStatistic.validTotal()
		
		if (validTotal.length > 0){
			await modelStatistic.updateTotalSt(validTotal[0].statistic_id, totalSt[0].total)
		}
		else {
			await modelStatistic.addTotalSt(totalSt[0].total, new Date())
		}

		response.json({
			status: 201,
			message: 'Student successfully added!'
		})

		return next()
	} catch(error) {
		return next(error)
	}
}


const DELETE = async (request, response, next) => {
	try {
		
		const { student_id } = request.query
		const studentDelete = await modelS.studentDel(student_id)
		if (studentDelete.length > 0){
			response.json({
				status: 200,
				message: 'Student has been deleted!'
			})
		} else throw new ClientError(404,'Student not found!')

		const totalSt = await modelStatistic.totalStudents()
		const totalDelSt = await modelStatistic.totalDelStudents()
		const validTotalDel = await modelStatistic.validTotalDel()
		if (validTotalDel.length > 0){
			await modelStatistic.updateTotalDelSt(validTotalDel[0].statistic_id, totalDelSt[0].total)
		}
		else {
			await modelStatistic.addTotalDelSt(totalSt[0].total,totalDelSt[0].total, new Date().toLocaleDateString('uz-UZ'))
		}

	} catch(error) {
		return next(error)
	}
}


export default {
	GET,
	POST,
	DELETE
}