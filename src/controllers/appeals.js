import ClientError  from '../utils/errors.js'
import model from '../middlewares/models/appealModel.js'

const GET = async (request, response, next) => {
	try {
		const controlDelAppeal = await model.controlDelApp()
		const appeals = await model.appeals()
		response.json(appeals)

		return next()
	} catch(error) {
		return next(error)
	}
}

const POST = async (request, response, next) => {
	try {
		const { user_name, user_phone } = request.body
		const validAppeal = await model.validAppeal(user_phone)

		if(validAppeal.length > 0) throw new ClientError(400, 'This user is available!')

		const newAppeal = await model.addAppeal({ user_name, user_phone })
		
		if(newAppeal.length > 0) {
			response.json({
				status: 201,
				message: 'User successfully added!',
				data: newAppeal
			})
		}

		return next()
	} catch(error) {
		return next(error)
	}
}

const DELETE = async (request, response, next) => {
	try {
		const { appeal_id } = request.query
		const validAppeal = await model.validAppeal(null, appeal_id)

		if(validAppeal.length > 0) {
			const deleted = await model.appealDel(appeal_id)
			response.json({
				status: 200,
				message: 'User has been deleted!'
			})
		} else throw new ClientError(404,'User not found!')

		return next()
	} catch(error) {
		return next(error)
	}
}

export default {
	GET,
	POST,
	DELETE
}