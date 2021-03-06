INSERT INTO groups (group_name) VALUES 
('Foundation'),
('Java'),
('NodeJS'),
('Flutter'),
('JavaScript'),
('UX-UI'),
('GO'),
('SMM'),
('C#');


INSERT INTO teachers (teacher_name,teacher_phone,teacher_profile_img,lesson_days,lesson_hours,group_id)
VALUES 
('Alisher Kasimov', '998901234567', 'avatar.jpg','Dush, Sesh, Juma', '14:00 - 16:00', 1),
('Akbarshox Sattarov', '998901234561', 'avatar1.png','Sesh, Pay, Shan', '18:00 - 20:00', 2),
('Saud Abdulvahed', '998901234565', 'avatar2.png','Dush, Chor, Juma', '09:00 - 12:00', 4),
('MuhammadHusayn Olimjonov', '998901234560', 'avatar3.jpg','Dush, Sesh, Chor, Pay, Juma', '17:30 - 20:00', 3);

UPDATE groups SET group_active = true WHERE group_id = 1;
UPDATE groups SET group_active = true WHERE group_id = 2;
UPDATE groups SET group_active = true WHERE group_id = 3;
UPDATE groups SET group_active = true WHERE group_id = 4;

INSERT INTO students (student_name,student_phone,parents_name,parents_phone,student_profile_img, delete_at_student)
VALUES
('Ali Vahobov', '998901234567', 'Aliev Zokir', '998902314567', 'metting.jpg',null),
('Bakir Bakirov', '998995641235', 'Eshmat Toshmatov', '998902314567', 'photo1.png',null),
('Alisher Egamberdiyev', '998902223365', 'Nigora Shakirova', '998902314589', 'photo2.jpg', '03.03.2022'),
('Oysha Toshmetova', '998918880880', 'Rustam Rustamov', '998947894561', 'nature.jpg',null),
('Aziz Toshpo''latov', '998973216547', 'Zokir Ravshanov', '998902314567', 'sky.jpg',null);



INSERT INTO payments (is_paid,student_id,teacher_id,group_id, payment_date) VALUES
(false, 1,2,2, null),
(false, 3,2,2, null),
(true, 5,1,1, '05.03.2022'),
(false, 2,4,3, null),
(true, 4,3,4,'10.03.2022'),
(false, 1,1,1, null),
(false, 3,4,3, null);


INSERT INTO attendance(attendance_date,incoming_date, student_id,teacher_id,group_id) VALUES
('01.02.2022',null,1,2,2),
('03.03.2022','03.03.2022',5,1,1);


INSERT INTO administrator (admin_name,admin_password,admin_phone) VALUES
('Admin', crypt('admin', gen_salt('bf')), '998901112233');


INSERT INTO appeals (user_name, user_phone) VALUES
('Eldor', '998998764525'),
('Sardor', '998945889778'),
('Ivan', '998902254281');


## Payments
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




## Attendance
SELECT 
	st.student_name,
	gr.group_name,
	a.attendance_date,
	t.teacher_name,
	st.student_phone,
	a.incoming_date,
	p.is_paid
FROM attendance as a
LEFT JOIN students as st on st.student_id = a.student_id
LEFT JOIN teachers as t on t.teacher_id = a.teacher_id
LEFT JOIN groups as gr on gr.group_id = a.group_id
LEFT JOIN payments as p on (p.student_id = a.student_id) and (p.group_id = a.group_id);
