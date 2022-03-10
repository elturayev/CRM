CREATE DATABASE crm_project;

DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS statistics CASCADE;


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
	group_id int not null references groups(group_id) on delete cascade
);


CREATE TABLE students(
	student_id serial not null primary key,
	student_name  varchar(60) not null,
	student_phone  varchar(12) not null,
	parents_name  varchar(50) not null,
	parents_phone  varchar(12) not null,
	student_profile_img  varchar(80)null,
	delete_at_student timestamp null,
	create_at_student  timestamp default current_timestamp
);


CREATE TABLE payments (
	payment_id serial not null primary key,
	is_paid boolean default false,
	payment_date varchar(30) default null,
	student_id int not null references students(student_id) on delete cascade,
	teacher_id int  not null references teachers(teacher_id) on delete cascade,
	group_id int not null references groups(group_id) on delete cascade
);


CREATE TABLE attendance (
	attendance_id serial not null primary key,
	attendance_date timestamp default current_date,
	incoming_date timestamp null,
	student_id int not null references students(student_id) on delete cascade,
	teacher_id int  not null references teachers(teacher_id) on delete cascade,
	group_id int not null references groups(group_id) on delete cascade,
	create_at_attendance timestamp default current_timestamp
);


CREATE TABLE statistics (
	statistic_id serial not null primary key,
	total_students smallint default 0,
	total_deleted_students  smallint default 0,
	statistic_date timestamp default null
);






