CREATE DATABASE crm_project;
CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS statistics CASCADE;
DROP TABLE IF EXISTS administrator CASCADE;
DROP TABLE IF EXISTS appeals CASCADE;


CREATE TABLE groups (
	group_id serial not null primary key,
	group_name varchar(60) not null,
	group_active boolean default false,
	create_at_group timestamp default current_timestamp
);



CREATE TABLE teachers (
	teacher_id serial not null primary key,
	teacher_name varchar(60) not null,
	teacher_phone varchar(12) not null,
	teacher_profile_img varchar(255) null,
	lesson_days varchar(80) not null,
	lesson_hours varchar(15) not null,
	create_at_teacher timestamp default current_timestamp,
	group_id int not null references groups(group_id) on delete cascade
);

CREATE TABLE students(
	student_id serial not null primary key,
	student_name  varchar(60) not null,
	student_phone  varchar(12) not null,
	parents_name  varchar(60) not null,
	parents_phone  varchar(12) not null,
	student_profile_img  varchar(255)null,
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
	statistic_date timestamptz default null
);


CREATE TABLE administrator (
	admin_id serial not null primary key,
	admin_name varchar(60) not null,
	admin_password varchar(255) not null,
	admin_phone varchar(12) not null,
	admin_profile_img varchar(255) null,
	role varchar(20) default 'admin',
	create_at_admin  timestamp default current_timestamp
);


CREATE TABLE appeals (
	appeal_id serial not null primary key,
	user_name varchar(60) not null,
	user_phone varchar(12) not null,
	create_at_appeal timestamp default current_timestamp
);


