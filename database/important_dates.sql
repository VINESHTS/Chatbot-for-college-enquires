INSERT INTO important_dates
(course_id, event_type, event_name, date, description, status)
VALUES

/* Computer Science Department (course_id 1–20) */
(1,'admission','BSc CS Admission Opens','2026-06-01','Admission process begins for BSc Computer Science','active'),
(1,'exam','BSc CS First Internal Exam','2026-09-15','Internal examination for Semester 1','active'),
(1,'semester','BSc CS Semester Begins','2026-07-01','Semester 1 classes start','active'),
(2,'admission','MSc CS Admission Opens','2026-06-05','Admission opens for MSc Computer Science','active'),
(2,'exam','MSc CS Semester Exam','2026-11-10','End semester examination','active'),
(3,'placement','BCA Campus Placement Drive','2026-12-15','Placement interviews for BCA students','active'),
(4,'placement','MCA Internship Drive','2026-10-20','Internship opportunities for MCA students','active'),
(5,'exam','Diploma Programming Final Exam','2026-12-05','Final exam for diploma students','active'),
(6,'general','Web Development Workshop','2026-08-15','Special workshop on modern web development','active'),
(7,'scholarship','AI Scholarship Application Deadline','2026-07-20','Scholarship deadline for AI students','active'),
(8,'scholarship','ML Scholarship Application Deadline','2026-07-25','Scholarship deadline for ML students','active'),
(9,'semester','Data Science Semester Starts','2026-07-10','Semester begins for Data Science course','active'),
(10,'hostel','Cyber Security Hostel Allotment','2026-06-20','Hostel room allocation begins','active'),

/* Electronics Department (course_id 21–40) */
(21,'admission','BTech Electronics Admission Opens','2026-06-01','Admission opens for Electronics Engineering','active'),
(21,'semester','BTech Electronics Semester Starts','2026-07-05','Semester begins','active'),
(22,'exam','MTech Electronics Mid Exam','2026-09-20','Mid semester exams','active'),
(23,'general','Embedded Systems Workshop','2026-08-05','Hands-on workshop','active'),
(24,'exam','VLSI Practical Exam','2026-10-15','Practical examination','active'),
(25,'placement','Robotics Placement Drive','2026-11-25','Campus placement for Robotics students','active'),
(26,'general','Automation Seminar','2026-08-25','Industry seminar on automation','active'),
(27,'exam','PCB Design Final Assessment','2026-09-30','Final project evaluation','active'),
(28,'semester','Signal Processing Classes Begin','2026-07-12','Semester classes start','active'),
(29,'hostel','Microcontroller Hostel Admission','2026-06-18','Hostel admission process','active'),

/* Mechanical Department (course_id 41–60) */
(41,'admission','Mechanical Engineering Admission Opens','2026-06-03','Admission starts','active'),
(42,'exam','MTech Mechanical Semester Exam','2026-11-15','Semester end exam','active'),
(43,'general','Thermal Engineering Workshop','2026-08-18','Workshop on thermal systems','active'),
(44,'placement','Automobile Placement Drive','2026-12-10','Placement drive for automobile students','active'),
(45,'semester','Production Engineering Semester Starts','2026-07-08','Classes begin','active'),

/* Civil Department (course_id 61–80) */
(61,'admission','Civil Engineering Admission Opens','2026-06-04','Admissions start','active'),
(62,'exam','Structural Engineering Mid Exam','2026-09-28','Mid semester exam','active'),
(63,'general','Construction Seminar','2026-08-10','Seminar on construction technology','active'),
(64,'hostel','Surveying Hostel Registration','2026-06-22','Hostel registration starts','active'),
(65,'placement','Environmental Engineering Placement','2026-12-05','Placement opportunities','active'),

/* Electrical Department (course_id 81–100) */
(81,'admission','Electrical Engineering Admission Opens','2026-06-06','Admissions open','active'),
(82,'exam','Power Systems Final Exam','2026-11-18','Final examination','active'),
(83,'general','Renewable Energy Workshop','2026-08-22','Energy workshop','active'),
(84,'placement','Electrical Machines Placement','2026-12-08','Placement drive','active'),
(85,'semester','Power Distribution Semester Start','2026-07-15','Semester starts','active'),

/* Business Administration (course_id 101–120) */
(101,'admission','BBA Admission Opens','2026-06-01','BBA admission starts','active'),
(102,'exam','MBA Finance Semester Exam','2026-11-20','Semester examination','active'),
(103,'placement','MBA Marketing Placement Drive','2026-12-18','Placement event','active'),
(104,'scholarship','MBA HR Scholarship Deadline','2026-07-30','Scholarship application deadline','active'),
(105,'general','Business Analytics Workshop','2026-08-28','Workshop event','active'),

/* Commerce (course_id 121–140) */
(121,'admission','BCom Finance Admission Opens','2026-06-02','Admissions open','active'),
(122,'exam','MCom Finance Semester Exam','2026-11-12','Semester exam','active'),
(123,'general','Taxation Seminar','2026-08-12','Tax seminar','active'),
(124,'placement','Banking Placement Drive','2026-12-14','Placement in banking sector','active'),
(125,'scholarship','Accounting Scholarship Deadline','2026-07-18','Scholarship application','active'),

/* Mathematics (course_id 141–160) */
(141,'admission','BSc Mathematics Admission Opens','2026-06-05','Admissions begin','active'),
(142,'exam','MSc Mathematics Final Exam','2026-11-22','Final exam','active'),
(143,'general','Applied Mathematics Workshop','2026-08-19','Math workshop','active'),
(144,'semester','Statistics Semester Start','2026-07-14','Semester starts','active'),
(145,'placement','Operations Research Placement','2026-12-20','Placement event','active'),

/* Physics (course_id 161–180) */
(161,'admission','BSc Physics Admission Opens','2026-06-07','Admission starts','active'),
(162,'exam','MSc Physics Semester Exam','2026-11-25','Semester examination','active'),
(163,'general','Quantum Physics Seminar','2026-08-20','Seminar on quantum mechanics','active'),
(164,'placement','Astrophysics Internship Drive','2026-12-12','Internship opportunities','active'),
(165,'scholarship','Nuclear Physics Scholarship Deadline','2026-07-27','Scholarship deadline','active'),

/* English (course_id 181–200) */
(181,'admission','BA English Admission Opens','2026-06-08','Admissions start','active'),
(182,'exam','MA English Semester Exam','2026-11-28','Semester exam','active'),
(183,'general','Creative Writing Workshop','2026-08-30','Writing workshop','active'),
(184,'placement','Journalism Placement Drive','2026-12-16','Placement event','active'),
(185,'scholarship','Linguistics Scholarship Deadline','2026-07-29','Scholarship application deadline','active');

INSERT INTO important_dates 
(course_id, event_type, event_name, date, description, status)
VALUES 
(1, 'admission', 'MBA Admission Deadline', '2026-07-15', 'Last date to apply for MBA admission', 'active');

INSERT INTO important_dates 
(course_id, event_type, event_name, date, description, status)
VALUES 
(1, 'admission', 'MBA Admission Starts', '2026-06-01', 'Admission process begins for MBA program', 'active');