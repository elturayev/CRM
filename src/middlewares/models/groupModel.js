import fetch from '../../utils/postgres.js'

const groupsQuery = `
	SELECT 
		* 
	FROM groups
	WHERE
	CASE
		WHEN length($1) > 0 THEN group_active = true
		ELSE group_active = false
	END`

const changeActiveQuery = `
	UPDATE groups SET group_active = true
	WHERE group_id = $1
	RETURNING *;
`

const groups = (active) => fetch(groupsQuery,active)

const changeActive = (group_id) => fetch(changeActiveQuery, group_id)

export default {
	groups,
	changeActive
}