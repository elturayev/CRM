import ClientError from '../utils/errors.js'
import model from '../middlewares/models/groupModel.js'

const GET = async (request, response, next) => {
	try {
		const { active } = request.params
		
		let groups;

		if(!active){
			groups = await model.groups()
		} 

		else if (active == 'active') {
			groups = await model.groups(active)
		}

		else throw new ClientError(400, active)

		response.json(groups)
		return next()
	} catch(error) {
		return next(error)
	}
}



export default {
	GET
}