import fetch from '../utils/postgres.js'

const studentQuery = `
	SELECT 
		st.student_id,
		st.student_name,
		st.parents_name,
		st.parents_phone,
		gr.group_id,
		gr.group_name,
		p.payment_date,
		t.teacher_name,
		st.student_phone,
		p.is_paid,
		to_char(st.create_at_student, 'DD-MM-YYYY') as createStudentdate
	FROM payments as p
	LEFT JOIN students as st on st.student_id = p.student_id
	LEFT JOIN teachers as t on t.teacher_id = p.teacher_id
	LEFT JOIN groups as gr on gr.group_id = p.group_id
`

const createStQuery = `
	INSERT INTO students (student_name,student_phone,parents_name,parents_phone,student_profile_img)
	VALUES ($1, $2, $3, $4, $5)
	RETURNING student_id, student_name, student_phone, student_profile_img
`

const searchTeacherIdQuery = `
	SELECT
		t.*
	FROM teachers as t
	WHERE t.group_id = $1
`

const addPQuery = `
	INSERT INTO payments (student_id,teacher_id,group_id) VALUES( $1, $2, $3 );
`

const teacherQuery = `
	SELECT 
		t.*,
		gr.group_name
	FROM teachers as t
	NATURAL JOIN groups as gr;
`

const addTQuery = `
	INSERT INTO teachers (teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id)
	VALUES($1, $2, $3, $4, $5, $6)
	RETURNING teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours ;
`

const students = () => fetch(studentQuery)
const addSt = ({student_name,student_phone,parents_name,parents_phone,student_profile_img}) => {
	return fetch(createStQuery, student_name,student_phone,parents_name,parents_phone,student_profile_img)
}
const teacherId = (group_id) => fetch(searchTeacherIdQuery, group_id)
const addPSt = ({studentId, teacherId, group_id}) => fetch(addPQuery, studentId, teacherId,group_id)
const teachers = () => fetch(teacherQuery)
const addT = ({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id}) => {
	return fetch(addTQuery, teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,+group_id)
}

export default {
	students,
	addSt,
	teacherId,
	addPSt,
	teachers,
	addT
}