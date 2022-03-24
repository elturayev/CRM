import fetch from '../../utils/postgres.js'

const controlDelAppQuery = `
	DELETE FROM appeals
	WHERE to_char(create_at_appeal::Date ,'yyyy/mm') < to_char(current_date, 'yyyy/mm')
`

const appealQuery = `SELECT * FROM appeals`

const validAppealQuery = `
	SELECT 
		*
	FROM appeals
	WHERE
	CASE
		WHEN $1 > 0 THEN appeal_id = $1
		ELSE true
	END AND
	CASE
		WHEN length($2) > 0 THEN user_phone = $2
		ELSE true
	END;
`

const addAppealQuery = `
	INSERT INTO appeals(user_name, user_phone) VALUES
	($1, $2)
	RETURNING *;
`

const appealDelQuery = `
	DELETE FROM appeals WHERE appeal_id = $1
`

const controlDelApp = () => fetch(controlDelAppQuery)

const appeals = () => fetch(appealQuery)

const validAppeal = (user_phone, appeal_id) => fetch(validAppealQuery, appeal_id, user_phone)

const addAppeal = ({ user_name, user_phone }) => {
	return fetch(addAppealQuery, user_name, user_phone)
}

const appealDel = (appeal_id) => fetch(appealDelQuery, appeal_id)

export default {
	controlDelApp,
	appeals,
	validAppeal,
	addAppeal,
	appealDel
}