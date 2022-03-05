import fetch from '../utils/postgres.js'

const studentQuery = `
	SELECT 
		st.student_name,
		gr.group_name,
		p.payment_date,
		t.teacher_name,
		st.student_phone,
		p.is_paid
	FROM payments as p
	LEFT JOIN students as st on st.student_id = p.student_id
	LEFT JOIN teachers as t on t.teacher_id = p.teacher_id
	LEFT JOIN groups as gr on gr.group_id = p.group_id
	WHERE p.is_paid = true;
`


const students = () => fetch(studentQuery)

export default {
	students
}