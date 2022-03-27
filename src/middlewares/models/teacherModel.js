import fetch from '../../utils/postgres.js'

const searchTeacherIdQuery = `SELECT * FROM teachers WHERE group_id = $1`


const teacherQuery = `
	SELECT 
		t.*,
		gr.group_name
	FROM 
		teachers as t
	NATURAL JOIN groups as gr
	WHERE
		CASE
			WHEN length($1) > 0 THEN gr.group_name ilike concat('%', $1, '%')
			ELSE true
		END
		CASE
			WHEN length($2) > 0 THEN t.teacher_id = $2
			ELSE true
		END;
`

const addTQuery = `
	INSERT INTO teachers (teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id)
	VALUES
		($1, $2, $3, $4, $5, $6)
	RETURNING *;
`

const teacherDelQuery = `
	DELETE FROM teachers WHERE teacher_id = $1
	RETURNING 'Teacher deleted'
`

const teacherId = (group_id) => fetch(searchTeacherIdQuery, group_id)
const teachers = (group_name, teacher_id) => fetch(teacherQuery,group_name, teacher_id)
const addT = ({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id}) => {
	return fetch(addTQuery, teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id)
}
const teacherDel = (teacherId) => fetch(teacherDelQuery, teacherId)



export default {
	teacherId,
	teachers,
	addT,
	teacherDel
}