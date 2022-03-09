import fetch from '../../utils/postgres.js'

const attendancesQuery = `
	SELECT 
		st.student_name,
		gr.group_name,
		to_char(a.attendance_date, 'DD.MM.YYYY') as attendance_date,
		t.teacher_name,
		st.student_phone,
		to_char(a.incoming_date, 'DD.MM.YYYY') as incoming_date,
		p.is_paid
	FROM attendance as a
	LEFT JOIN students as st on st.student_id = a.student_id
	LEFT JOIN teachers as t on t.teacher_id = a.teacher_id
	LEFT JOIN groups as gr on gr.group_id = a.group_id
	LEFT JOIN payments as p on (p.student_id = a.student_id) and (p.group_id = a.group_id);

`

const addAttendancesQuery = `
	INSERT INTO attendance(attendance_date,incoming_date, student_id,teacher_id,group_id) VALUES
	($1, $2, $3, $4, $5);
`

const deleteAttendancesQuery = `
	DELETE FROM attendance
	WHERE to_char(attendance_date::Date ,'yyyy/mm') < to_char(current_date, 'yyyy/mm')
`

const attendances = () => fetch(attendancesQuery)

const addAttendances = ({attendance_date,incoming_date, student_id,teacher_id,group_id}) => {
	return fetch(addAttendancesQuery,attendance_date ,incoming_date, student_id,teacher_id,group_id)
}

const deleteAttendances = () => fetch(deleteAttendancesQuery)

export default {
	attendances,
	addAttendances,
	deleteAttendances
}