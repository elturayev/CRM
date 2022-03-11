import  ClientError  from '../utils/errors.js'
import modelAuth from '../middlewares/models/authModel.js'

const LOGIN = async (request, response, next) => {
	try {

		const  { admin_name, admin_password } = request.body
		const admin = await modelAuth.login({ admin_name, admin_password })
		if(!(admin.length > 0)) throw new ClientError(404,'Admin not found!')

		response.json({
			status: 200,
			message: 'Admin successfully logged in!',
			data: admin
		})
		return next()
	} catch(error) {
		return next(error)
	}
}


export default {
	LOGIN
}