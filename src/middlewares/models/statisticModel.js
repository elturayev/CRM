import fetch from '../../utils/postgres.js'

// total students query
const statisticQuery = `
	SELECT
		*
	FROM statistics;
`

const totalStQuery = `
	SELECT
		count(st.student_id) as total
	FROM students as st
	WHERE 
	to_char(st.create_at_student, 'yyyy.mm') <= to_char(current_date, 'yyyy.mm')
	AND st.delete_at_student IS NULL
`

const validTotalQuery = `
	SELECT
		s.*
	FROM statistics as s
	WHERE to_char(s.statistic_date::Date, 'yyyy/mm') = to_char(current_date, 'yyyy/mm')
`

const addTotalStQuery = `
	INSERT INTO statistics (total_students,statistic_date)
	VALUES ($1, $2);
`

const updateTotalStQuery = 	`
	UPDATE statistics SET total_students = $2
	WHERE statistic_id = $1;
`


// total deleted students query
const totalDelStQuery = `
	SELECT
		count(st.student_id) as total
	FROM students as st
	WHERE 
	to_char(st.delete_at_student, 'yyyy.mm') <= to_char(current_date, 'yyyy.mm')
	AND st.delete_at_student IS NOT NULL
`
const validTotalDelQuery = `
	SELECT
		s.*
	FROM statistics as s
	WHERE to_char(s.statistic_date::Date, 'yyyy/mm') = to_char(current_date, 'yyyy/mm')
`

const addTotalDelStQuery = `
	INSERT INTO statistics (total_deleted_students,statistic_date)
	VALUES ($1, $2);
`

const updateTotalDelStQuery = 	`
	UPDATE statistics SET total_deleted_students = $2
	WHERE statistic_id = $1;
`

// total students
const statistics = () => fetch(statisticQuery)
const totalStudents = () => fetch(totalStQuery)
const validTotal = () => fetch(validTotalQuery)
const addTotalSt = (totalSt, statisticDate) => fetch(addTotalStQuery, totalSt ? totalSt : 0, statisticDate)
const updateTotalSt = (statisticId,totalSt) => fetch(updateTotalStQuery, statisticId,totalSt) 

// total deleted students
const totalDelStudents = () => fetch(totalDelStQuery)
const validTotalDel = () => fetch(validTotalDelQuery)
const addTotalDelSt = (totalDelSt, statisticDate) => fetch(addTotalDelStQuery,totalDelSt, statisticDate)
const updateTotalDelSt = (statisticId,totalDelSt) => fetch(updateTotalDelStQuery,statisticId,totalDelSt)

export default {
	statistics,
	totalStudents,
	validTotal,
	addTotalSt,
	updateTotalSt,

	totalDelStudents,
	validTotalDel,
	addTotalDelSt,
	updateTotalDelSt
}