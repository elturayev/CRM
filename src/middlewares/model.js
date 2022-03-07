import fetch from '../utils/postgres.js'

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
		to_char(st.create_at_student, 'DD-MM-YYYY') as createStudentdate
	FROM payments as p
	LEFT JOIN students as st on st.student_id = p.student_id
	LEFT JOIN teachers as t on t.teacher_id = p.teacher_id
	LEFT JOIN groups as gr on gr.group_id = p.group_id
	WHERE
	CASE
		WHEN length($1) > 0 THEN st.student_name ilike concat('%', $1, '%')
		ELSE true
	END
	ORDER BY st.student_id;
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

const teacherDelQuery = `
	DELETE FROM teachers WHERE teacher_id = $1
	RETURNING 'Teacher deleted'
`

const studentDelQuery = `
	DELETE FROM students WHERE student_id = $1
	RETURNING 'Student deleted'
`

const paidQuery = `
	SELECT 
		st.student_name,
		st.student_phone,
		gr.group_name,
		t.teacher_name,
		p.payment_date,
		p.is_paid
	FROM payments as p
	LEFT JOIN students as st on st.student_id = p.student_id
	LEFT JOIN teachers as t on t.teacher_id = p.teacher_id
	LEFT JOIN groups as gr on gr.group_id = p.group_id
	WHERE p.is_paid = true;
`

const paidOffQuery = `
	UPDATE payments SET is_paid = $1, payment_date = $5
	WHERE (student_id = $2 and teacher_id = $3 and group_id = $4)
	RETURNING payment_date;
`

const students = (username) => fetch(studentQuery,(username ? username : ''))
const addSt = ({student_name,student_phone,parents_name,parents_phone,student_profile_img}) => {
	return fetch(createStQuery, student_name,student_phone,parents_name,parents_phone,student_profile_img)
}
const teacherId = (group_id) => fetch(searchTeacherIdQuery, group_id)
const addPSt = ({studentId, teacherId, group_id}) => fetch(addPQuery, studentId, teacherId,group_id)
const teachers = () => fetch(teacherQuery)
const addT = ({teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id}) => {
	return fetch(addTQuery, teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,+group_id)
}

const teacherDel = (teacherId) => fetch(teacherDelQuery, teacherId)
const studentDel = (studentId) => fetch(studentDelQuery, studentId)
const paids = () => fetch(paidQuery)
const paidOff = ({is_paid, studentId, teacher_id,group_id, payment_date}) => {
	return fetch(paidOffQuery, is_paid, studentId, teacher_id,group_id, payment_date)
}

export default {
	students,
	addSt,
	teacherId,
	addPSt,
	teachers,
	addT,
	teacherDel,
	studentDel,
	paids,
	paidOff
}