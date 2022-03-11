import fetch from '../../utils/postgres.js'


const loginQuery = `
	SELECT 
		a.admin_id,
		a.admin_name,
		a.admin_phone,
		a.admin_profile_img,
		a.role
	FROM administrator as a
	WHERE a.admin_name = $1 AND a.admin_password = crypt($2, a.admin_password);
`

const login = ({ admin_name, admin_password }) => fetch(loginQuery,admin_name,admin_password)


export default {
	login
}