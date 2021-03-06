import fetch from '../../utils/postgres.js'

const studentQuery = `
	SELECT 
		st.student_id,
		st.student_name,
		st.parents_name,
		st.parents_phone,
		st.student_profile_img,
		gr.group_id, 
		gr.group_name,
		p.payment_date,
		t.teacher_id,
		t.teacher_name,
		st.student_phone,
		p.is_paid,
		to_char(st.delete_at_student, 'DD.MM.YYYY') as delete_student_date,
		to_char(st.create_at_student, 'DD.MM.YYYY') as create_student_date
	FROM payments as p
	LEFT JOIN students as st on st.student_id = p.student_id
	LEFT JOIN teachers as t on t.teacher_id = p.teacher_id
	LEFT JOIN groups as gr on gr.group_id = p.group_id
	WHERE
	CASE
		WHEN length($1) > 0 THEN st.student_name ilike concat('%', $1, '%')
		ELSE true
	END AND
	CASE
		WHEN length($4) > 0 THEN st.student_phone = $4
		ELSE true
	END AND delete_at_student IS NULL
	ORDER BY st.student_id
	OFFSET $2 ROWS 
	FETCH FIRST $3 ROW ONLY;
`

const createStQuery = `
	INSERT INTO students (student_name,student_phone,parents_name,parents_phone,student_profile_img)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING student_id, student_name, student_phone, student_profile_img
`

const validStQuery = `
	SELECT 
		p.*
	FROM payments as p
	NATURAL JOIN students as st
	NATURAL JOIN groups as gr
	WHERE st.student_phone = $1 AND gr.group_id = $2 AND st.delete_at_student IS NULL
`

const addPQuery = `
	INSERT INTO payments (student_id,teacher_id,group_id) VALUES( $1, $2, $3 )
	RETURNING *;
`

const deleteStQuery = `
	SELECT	
		st.student_id,
		st.student_name,
		st.student_phone,
		st.student_profile_img,
		st.parents_name,
		st.parents_phone,
		to_char(st.delete_at_student, 'DD.MM.YYYY') as delete_student_date,
		to_char(st.create_at_student, 'DD.MM.YYYY') as create_student_date
	FROM students as st
	WHERE st.delete_at_student IS NOT NULL
`
const controlDelStQuery = `
	DELETE FROM students
	WHERE to_char(delete_at_student::Date ,'yyyy/mm') < to_char(current_date, 'yyyy/mm')
`

const studentDelQuery = `
	UPDATE students SET delete_at_student = current_date WHERE student_id = $1
	RETURNING student_id, student_name, student_phone, student_profile_img
`


const students = (username, page, limit) => {
	return fetch(studentQuery,(username.student_name ? username.student_name : ''), (page - 1) * limit, limit,(username.student_phone ? username.student_phone : ''))}

const addSt = ({student_name,student_phone,parents_name,parents_phone,student_profile_img}) => {
	return fetch(createStQuery, student_name,student_phone,parents_name,parents_phone,student_profile_img)
}

const validSt = ({ student_phone, group_id }) => fetch(validStQuery, student_phone, group_id)
const addPSt = ({studentId, teacherId, group_id}) => fetch(addPQuery, studentId, teacherId,group_id)
const studentDel = (studentId) => fetch(studentDelQuery, studentId)
const deleteSt = () => fetch(deleteStQuery)
const controlDelSt = () => fetch(controlDelStQuery)


export default {
	students,
	addSt,
	validSt,
	addPSt,
	studentDel,
	deleteSt,
	controlDelSt
}