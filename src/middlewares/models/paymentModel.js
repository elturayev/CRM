import fetch from '../../utils/postgres.js'

const paidUpdateQuery = `
	UPDATE payments SET is_paid = false, payment_date = null
	WHERE to_char(payment_date::date, 'yyyy/mm') < to_char(current_date, 'yyyy/mm')
	RETURNING is_paid, payment_date;
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
	WHERE p.payment_date IS NOT NULL AND
	CASE
		WHEN length($1) > 0 THEN st.student_name ilike concat('%', $1, '%')
		ELSE true
	END;
`

const paidOffQuery = `
	UPDATE payments SET is_paid = $1, payment_date = $5
	WHERE (student_id = $2 and teacher_id = $3 and group_id = $4)
	RETURNING payment_date;
`

const paids = (student_name) => fetch(paidQuery, student_name)
const paidOff = ({is_paid, studentId, teacher_id,group_id, payment_date}) => {
	return fetch(paidOffQuery, is_paid, studentId, teacher_id,group_id, payment_date)
}
const paidUpdate = () => fetch(paidUpdateQuery)



export default {
	paids,
	paidOff,
	paidUpdate
}