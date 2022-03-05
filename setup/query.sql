CREATE DATABASE crm_project;

DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS attendance;


CREATE TABLE groups (
	group_id serial not null primary key,
	group_name varchar(50) not null,
	create_at_group timestamp default current_timestamp
);


CREATE TABLE teachers (
	teacher_id serial not null primary key,
	teacher_name varchar(60) not null,
	teacher_phone varchar(12) not null,
	teacher_profile_img varchar(80) null,
	lesson_days varchar(80) not null,
	lesson_hours varchar(15) not null,
	create_at_teacher timestamp default current_timestamp,
	group_id int not null references groups(group_id)
);


CREATE TABLE students(
	student_id serial not null primary key,
	student_name  varchar(60) not null,
	student_phone  varchar(12) not null,
	student_parents_name  varchar(50) not null,
	student_parents_phone  varchar(12) not null,
	student_profile_img  varchar(80)null,
	create_at_student  timestamp default current_timestamp
);


CREATE TABLE payments (
	payment_id serial not null primary key,
	is_paid boolean default false,
	payment_date varchar(30) default null,
	student_id int not null references students(student_id),
	teacher_id int  not null references teachers(teacher_id),
	group_id int not null references groups(group_id)
);


CREATE TABLE attendance (
	attendance_id serial not null primary key,
	attendance_date varchar(50) not null,
	student_id int not null references students(student_id),
	teacher_id int  not null references teachers(teacher_id),
	group_id int not null references groups(group_id),
	create_at_attendance timestamp default current_timestamp
);






