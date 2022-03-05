const GET = (request, response ) => {
	try {
		console.log('ali')
		response.end('Hello')
	} catch(error) {
		console.log(error)
	}
}

export default {
	GET
}