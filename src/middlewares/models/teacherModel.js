import fetch from '../../utils/postgres.js'

const searchTeacherIdQuery = `
	SELECT 
		* 
	FROM teachers 
	WHERE 
	CASE 
		WHEN $1 > 0 THEN  group_id = $1
		ELSE true
	END AND
	CASE 
		WHEN $2 > 0 THEN teacher_id = $2
		ELSE true
	END `



const teacherQuery = `
	SELECT 
		t.teacher_id,
		t.teacher_name,
		t.teacher_phone,
		t.teacher_profile_img,
		t.lesson_days,
		t.lesson_hours,
		to_char(t.create_at_teacher, 'DD.MM.YYYY') as create_at_teacher,
		t.group_id,
		gr.group_name
	FROM 
		teachers as t
	NATURAL JOIN groups as gr
	WHERE
		CASE
			WHEN length($1) > 0 THEN gr.group_name ilike concat('%', $1, '%')
			ELSE true
		END AND
		CASE
			WHEN $2 > 0 THEN t.teacher_id = $2
			ELSE true
		END;
`

const addTQuery = `
	INSERT INTO teachers (teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id)
	VALUES
		($1, $2, $3, $4, $5, $6)
	RETURNING *;
`

const changeTQuery = `
	UPDATE teachers 
	SET 
		teacher_name = $2, 
		teacher_phone = $3,  
		teacher_profile_img = $4,
		lesson_days = $5,
		lesson_hours = $6,
		create_at_teacher = current_date
	WHERE teacher_id = $1 AND group_id = $7
	RETURNING teacher_id, teacher_name, teacher_phone, group_id
`

const teacherDelQuery = `
	DELETE FROM teachers WHERE teacher_id = $1
	RETURNING 'Teacher deleted'
`

const teacherId = (group_id, teacher_id) => fetch(searchTeacherIdQuery, group_id, teacher_id)
const teachers = (group_name, teacher_id) => fetch(teacherQuery,group_name, teacher_id)
const addT = ({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id}) => {
	return fetch(addTQuery, teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id)
}

const changeTeacher = ({teacher_id, teacher_name, teacher_phone, teacher_profile_img, lesson_days, lesson_hours, group_id }) => {
	return fetch(changeTQuery, teacher_id, teacher_name, teacher_phone, teacher_profile_img, lesson_days, lesson_hours, group_id)
}
const teacherDel = (teacherId) => fetch(teacherDelQuery, teacherId)



export default {
	teacherId,
	teachers,
	addT,
	changeTeacher,
	teacherDel
}