import model from '../middlewares/model.js'

const GET = async (request, response ) => {
	try {
		const data = await model.students()
		response.json(data)
	} catch(error) {
		console.log(error)
	}
}

export default {
	GET
}