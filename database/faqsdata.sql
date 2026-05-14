INSERT INTO faqs
(intent, category, question, response, keywords, priority, status)
VALUES

('admission_process','Admission',
'What is the complete admission process?',
'The admission process begins with online registration through the college portal. Students must fill out the application form, upload academic documents, pay the application fee, and submit the application. After submission, the college verifies the documents and prepares a merit list or entrance-based selection list. Selected candidates will receive confirmation through email or SMS and must complete fee payment to confirm admission.',
'admission process application registration',1,'active'),

('admission_eligibility','Admission',
'What are the eligibility criteria for undergraduate courses?',
'Eligibility for undergraduate programs generally requires successful completion of Higher Secondary Education (12th grade) from a recognized board. Some courses may require minimum percentage criteria or specific subject requirements such as Mathematics or Science.',
'eligibility undergraduate qualification',1,'active'),

('admission_pg_eligibility','Admission',
'What are the eligibility criteria for postgraduate courses?',
'For postgraduate courses, students must have completed a bachelor’s degree in the relevant discipline from a recognized university with the required minimum marks. Some programs may require entrance exams or interviews.',
'postgraduate eligibility masters admission',1,'active'),

('admission_deadline','Admission',
'When does the admission process close?',
'Admission deadlines vary every academic year. Students are advised to regularly check the official college website or contact the admission office for the latest application deadlines.',
'admission deadline last date',2,'active'),

('admission_documents','Admission',
'What documents are required for admission?',
'Required documents usually include 10th and 12th mark sheets, transfer certificate, passport-size photographs, ID proof, community certificate (if applicable), income certificate for scholarship purposes, and migration certificate for students from other boards or universities.',
'admission documents certificates',1,'active'),

('admission_fee','Admission',
'Is there an application fee for admission?',
'Yes, students are required to pay an application fee during the admission process. The fee amount varies depending on the course and is non-refundable.',
'application fee admission payment',2,'active'),

('admission_status','Admission',
'How can I check my admission status?',
'Students can log in to the college admission portal using their application number and password to check the current status of their application, including document verification and selection updates.',
'admission status application tracking',2,'active'),

('management_quota','Admission',
'Do you offer management quota admissions?',
'Yes, management quota seats are available for selected programs. Students must contact the admission office directly for eligibility, fee details, and seat availability under management quota.',
'management quota direct admission',3,'active'),

('lateral_entry','Admission',
'Is lateral entry admission available?',
'Yes, diploma holders can apply for lateral entry in eligible courses such as engineering or technical programs. Admission is based on qualification and seat availability.',
'lateral entry diploma admission',2,'active'),

('spot_admission','Admission',
'Do you conduct spot admissions?',
'Spot admissions may be conducted if seats remain vacant after the regular admission process. Notifications will be published on the official website.',
'spot admission vacant seats',4,'active'),

('course_list','Courses',
'What courses are offered by the college?',
'The college offers a wide range of undergraduate, postgraduate, diploma, and certificate programs in arts, science, commerce, management, and technology streams.',
'course list programs offered',1,'active'),

('course_duration_bca','Courses',
'What is the duration of the BCA course?',
'Bachelor of Computer Applications (BCA) is a 3-year undergraduate degree program divided into 6 semesters. It focuses on computer programming, software development, and IT fundamentals.',
'bca duration semesters',1,'active'),

('course_duration_bcom','Courses',
'What is the duration of the BCom course?',
'Bachelor of Commerce (BCom) is a 3-year undergraduate program divided into 6 semesters. It covers accounting, finance, taxation, and business studies.',
'bcom duration semesters',1,'active'),

('course_duration_mca','Courses',
'What is the duration of the MCA course?',
'Master of Computer Applications (MCA) is usually a 2-year postgraduate program focusing on advanced software development and computer applications.',
'mca duration postgraduate',1,'active'),

('course_syllabus','Courses',
'Where can I get the course syllabus?',
'The complete syllabus for each course is available on the official college website under the academics section. Students can also request a copy from their department office.',
'course syllabus curriculum',2,'active'),

('course_structure','Courses',
'How is the semester system structured?',
'Most undergraduate programs follow a 6-semester structure, while postgraduate programs follow 4 semesters. Each semester includes internal assessments, practicals, and final exams.',
'semester structure academics',2,'active'),

('course_electives','Courses',
'Are elective subjects available?',
'Yes, elective subjects are available in selected courses. Students can choose electives based on their interests and career goals, subject to department approval.',
'elective subjects optional papers',3,'active'),

('course_projects','Courses',
'Is project work mandatory?',
'Yes, final-year students are generally required to complete project work as part of their curriculum. Projects help students gain practical and research experience.',
'project work final year',2,'active'),

('course_practicals','Courses',
'Are practical sessions included in the course?',
'Yes, practical sessions are an important part of science, computer, and technical courses. Labs are conducted regularly as per academic schedule.',
'practical sessions laboratory',2,'active'),

('course_medium','Courses',
'What is the medium of instruction?',
'English is the primary medium of instruction for most courses. However, some language-based subjects may use regional languages where applicable.',
'medium instruction english',2,'active'),

('fee_structure','Fees',
'What is the fee structure for courses?',
'The fee structure varies depending on the course and semester. It includes tuition fees, lab fees, exam fees, and other institutional charges. Detailed fee structure is available on the official website.',
'fee structure tuition fees',1,'active'),

('fee_payment','Fees',
'How can students pay their fees?',
'Fees can be paid online through the student portal using net banking, UPI, debit card, or credit card. Offline payment options may also be available at the accounts office.',
'fee payment online offline',1,'active'),

('fee_installment','Fees',
'Can fees be paid in installments?',
'Yes, installment-based fee payment options are available for selected courses. Students must get approval from the accounts department.',
'installment fee payment',2,'active'),

('fee_due_date','Fees',
'How can I know the fee due date?',
'Fee due dates are announced through the student portal, notice board, and official college communication channels.',
'fee due date deadline',2,'active'),

('late_fee_penalty','Fees',
'Is there a late fee penalty?',
'Yes, students who fail to pay fees before the due date may be charged a late fee penalty as per college policy.',
'late fee penalty fine',2,'active'),

('fee_refund','Fees',
'What is the fee refund policy?',
'Fee refunds are processed according to institutional refund rules. Refund eligibility depends on the withdrawal stage and official regulations.',
'fee refund policy',2,'active'),

('exam_fee','Fees',
'Is exam fee included in semester fees?',
'No, exam fees are usually collected separately during exam registration.',
'exam fee separate',2,'active'),

('hostel_fee','Fees',
'How much is the hostel fee?',
'Hostel fees vary depending on room type, facilities, and food plan. Detailed fee information is available from the hostel office.',
'hostel fee accommodation',2,'active'),

('transport_fee','Fees',
'What is the transportation fee?',
'Transport fees depend on the selected route and distance from the college. Bus fee details can be obtained from the transport office.',
'transport bus fee',3,'active'),

('fee_receipt','Fees',
'How can I download my fee receipt?',
'Fee receipts can be downloaded from the student portal after successful payment confirmation.',
'fee receipt payment proof',2,'active'),

('scholarship_available','Scholarship',
'What scholarships are available?',
'The college offers merit scholarships, government scholarships, minority scholarships, sports scholarships, and need-based financial assistance for eligible students.',
'scholarship financial aid',1,'active'),

('scholarship_apply','Scholarship',
'How can I apply for scholarships?',
'Students can apply through the official scholarship portal by submitting the required academic and financial documents before the deadline.',
'apply scholarship online',1,'active'),

('scholarship_eligibility','Scholarship',
'Who is eligible for scholarships?',
'Eligibility depends on academic performance, family income, category, and scholarship type. Each scholarship has its own eligibility criteria.',
'scholarship eligibility criteria',2,'active'),

('merit_scholarship','Scholarship',
'Do you offer merit scholarships?',
'Yes, students with excellent academic performance are eligible for merit-based scholarships based on marks and ranking.',
'merit scholarship academic',1,'active'),

('sports_scholarship','Scholarship',
'Are sports scholarships available?',
'Yes, students with state or national-level sports achievements can apply for sports scholarships.',
'sports scholarship athletics',2,'active'),

('minority_scholarship','Scholarship',
'Do minority students get scholarships?',
'Yes, minority students can apply for eligible government and institutional scholarship programs.',
'minority scholarship government',2,'active'),

('scholarship_renewal','Scholarship',
'How to renew scholarship?',
'Scholarship renewal requires maintaining the minimum academic performance and submitting renewal documents before the deadline.',
'scholarship renewal continue',2,'active'),

('hostel_available','Hostel',
'Is hostel accommodation available?',
'Yes, the college provides separate hostel facilities for boys and girls with essential amenities and security.',
'hostel accommodation available',1,'active'),

('hostel_room_types','Hostel',
'What room types are available in the hostel?',
'Hostels offer single, double-sharing, and multiple-sharing rooms depending on availability and student preference.',
'hostel room types sharing',2,'active'),

('hostel_food','Hostel',
'Is food provided in the hostel?',
'Yes, hostels provide daily meals including breakfast, lunch, evening snacks, and dinner through the mess facility.',
'hostel food mess meals',2,'active'),

('hostel_wifi','Hostel',
'Is WiFi available in the hostel?',
'Yes, WiFi internet access is available for hostel students for academic and personal use.',
'hostel wifi internet',2,'active'),

('hostel_security','Hostel',
'How secure is the hostel?',
'Hostels are monitored with CCTV cameras, security staff, and strict entry-exit regulations to ensure student safety.',
'hostel security cctv',2,'active'),

('placement_support','Placement',
'Does the college provide placement support?',
'Yes, the college has a dedicated placement cell that organizes training, career guidance, and campus recruitment programs.',
'placement support jobs career',1,'active'),

('placement_training','Placement',
'What placement training is provided?',
'Students receive aptitude training, group discussion practice, communication skill development, and mock interview sessions.',
'placement training aptitude interview',1,'active'),

('placement_companies','Placement',
'Which companies recruit from campus?',
'Various companies from IT, finance, marketing, manufacturing, and core sectors participate in campus placements every year.',
'placement companies recruiters',1,'active'),

('placement_eligibility','Placement',
'Who is eligible for placements?',
'Final-year students who meet the academic eligibility criteria and have minimum required attendance can participate in placements.',
'placement eligibility final year',2,'active'),

('placement_package','Placement',
'What is the average placement package?',
'The average salary package varies by course and company. Detailed placement statistics are published annually by the placement cell.',
'average package salary placement',2,'active'),

('internship_support','Placement',
'Does the college provide internship support?',
'Yes, internship opportunities are arranged through company partnerships and department collaborations.',
'internship support training',2,'active');

INSERT INTO faqs
(intent, category, question, response, keywords, priority, status)
VALUES

('placement_backlogs','Placement',
'Can students with backlogs attend placements?',
'Eligibility for students with backlogs depends on company requirements. Some companies allow students with active backlogs, while others require all papers to be cleared before participating.',
'placement backlog eligibility',3,'active'),

('resume_support','Placement',
'Do you provide resume preparation support?',
'Yes, the placement cell helps students prepare professional resumes, improve profile presentation, and optimize resumes according to industry standards.',
'resume preparation placement',2,'active'),

('mock_interview','Placement',
'Are mock interviews conducted?',
'Yes, mock interviews are conducted by faculty and industry experts to help students gain confidence and improve interview performance.',
'mock interview practice',2,'active'),

('placement_percentage','Placement',
'What is the placement percentage of the college?',
'Placement percentage changes every year depending on student performance and industry demand. Recent placement records are available from the placement office.',
'placement percentage records',2,'active'),

('highest_package','Placement',
'What is the highest placement package offered?',
'The highest package offered varies each year and depends on the recruiting company, student skills, and industry requirements.',
'highest package placement',2,'active'),

('exam_schedule','Exams',
'When are semester examinations conducted?',
'Semester examinations are conducted at the end of every semester according to the academic calendar. Exact dates are announced in advance.',
'semester exam schedule',1,'active'),

('hall_ticket_download','Exams',
'How can I download my hall ticket?',
'Students can log in to the student portal and download their hall ticket after completing exam registration and fee payment.',
'hall ticket exam download',1,'active'),

('exam_fee_payment','Exams',
'How can I pay examination fees?',
'Examination fees can be paid online through the student portal during the exam registration period.',
'exam fee payment online',2,'active'),

('exam_revaluation','Exams',
'Can I apply for exam revaluation?',
'Yes, students can apply for revaluation after the publication of results by submitting the application and paying the required fee.',
'exam revaluation marks',2,'active'),

('supplementary_exam','Exams',
'Is there a supplementary examination?',
'Yes, supplementary examinations are conducted for students who fail in regular semester exams, based on university guidelines.',
'supplementary exam arrears',2,'active'),

('exam_results','Exams',
'How can I check my exam results?',
'Students can check their exam results through the student portal by entering their registration number or login credentials.',
'exam result marksheet',1,'active'),

('internal_marks','Exams',
'How are internal marks calculated?',
'Internal marks are calculated based on attendance, assignments, seminars, and internal examinations conducted during the semester.',
'internal marks calculation',2,'active'),

('exam_absence','Exams',
'What happens if I miss an examination?',
'Students who miss exams due to valid reasons like medical emergencies may apply for special consideration as per college rules.',
'missed exam absence',3,'active'),

('exam_pattern','Exams',
'What is the exam pattern?',
'The exam pattern usually consists of internal assessment, semester-end theory exams, and practical examinations where applicable.',
'exam pattern theory practical',2,'active'),

('grading_system','Exams',
'What grading system is followed?',
'The college follows a CGPA-based grading system along with percentage conversion as per university regulations.',
'grading cgpa percentage',2,'active'),

('tc_requirement','Documents',
'Is a Transfer Certificate required for admission?',
'Yes, a Transfer Certificate (TC) from the previous institution is required for final admission confirmation.',
'transfer certificate admission',1,'active'),

('migration_certificate','Documents',
'Do I need a migration certificate?',
'Migration certificates are required for students coming from a different board or university outside the current education system.',
'migration certificate required',2,'active'),

('community_certificate','Documents',
'Is a community certificate mandatory?',
'Community certificates are mandatory only for students applying under reservation categories.',
'community certificate reservation',2,'active'),

('income_certificate','Documents',
'Is an income certificate needed?',
'Income certificates are required mainly for scholarship applications and fee concessions.',
'income certificate scholarship',2,'active'),

('original_documents','Documents',
'Do I need to submit original certificates?',
'Original certificates are required for verification during admission but are returned after the process unless otherwise required.',
'original certificate verification',2,'active'),

('id_proof','Documents',
'What ID proof is accepted during admission?',
'Valid ID proofs such as Aadhaar card, Passport, Voter ID, or Driving License are accepted.',
'id proof admission',2,'active'),

('passport_photos','Documents',
'How many passport-size photos are needed?',
'Students are generally required to submit 4 to 6 recent passport-size photographs during admission.',
'passport size photos',3,'active'),

('document_verification','Documents',
'How long does document verification take?',
'Document verification is usually completed within 2 to 5 working days depending on the admission volume.',
'document verification process',2,'active'),

('bonafide_certificate','Documents',
'How can I get a bonafide certificate?',
'Students can apply for a bonafide certificate through the academic office by filling out the application form.',
'bonafide certificate application',3,'active'),

('character_certificate','Documents',
'Is a character certificate required?',
'Yes, some courses require a character or conduct certificate from the previous institution.',
'character certificate conduct',3,'active'),

('library_facility','Facilities',
'Does the college have a library?',
'Yes, the college has a central library with textbooks, journals, digital resources, and reference materials for all departments.',
'library books journals',1,'active'),

('digital_library','Facilities',
'Is a digital library available?',
'Yes, students can access digital resources including e-books, journals, and research databases through the library portal.',
'digital library ebooks',2,'active'),

('computer_lab','Facilities',
'Are computer labs available?',
'Yes, the college has modern computer labs equipped with updated systems, software, and internet access.',
'computer lab facilities',1,'active'),

('science_lab','Facilities',
'Are science laboratories available?',
'Yes, science departments have fully equipped laboratories for practical learning and experiments.',
'science laboratory practical',2,'active'),

('wifi_campus','Facilities',
'Is WiFi available on campus?',
'Yes, campus-wide WiFi connectivity is available for students and faculty for academic purposes.',
'campus wifi internet',2,'active'),

('canteen_facility','Facilities',
'Is there a canteen on campus?',
'Yes, the college has a hygienic canteen that provides meals, snacks, and beverages at affordable prices.',
'canteen food facility',2,'active'),

('sports_facility','Facilities',
'What sports facilities are available?',
'The college provides facilities for football, cricket, basketball, volleyball, badminton, and indoor games.',
'sports ground games',2,'active'),

('gym_facility','Facilities',
'Is there a gym on campus?',
'Yes, gym facilities are available for students to support physical fitness and wellness.',
'gym fitness campus',3,'active'),

('medical_support','Facilities',
'Is medical support available?',
'Yes, first-aid and medical emergency support are available on campus, with tie-ups to nearby hospitals.',
'medical support emergency',2,'active'),

('parking_facility','Facilities',
'Is parking available for students?',
'Yes, parking facilities are available for both two-wheelers and four-wheelers inside the campus.',
'parking vehicle campus',3,'active'),

('transport_available','Transport',
'Does the college provide transportation?',
'Yes, the college provides bus transportation for students across multiple routes for convenient travel.',
'transport bus routes',1,'active'),

('transport_routes','Transport',
'How can I know the bus routes?',
'Bus route details are available at the transport office and on the official college website.',
'bus routes transport',2,'active'),

('transport_fee_payment','Transport',
'How is transport fee paid?',
'Transport fees can be paid along with semester fees or separately at the accounts office.',
'transport fee payment',2,'active'),

('bus_timing','Transport',
'What are the bus timings?',
'Bus timings are fixed according to the route schedule and communicated at the start of the semester.',
'bus timing schedule',2,'active'),

('bus_pass','Transport',
'Do students get bus passes?',
'Yes, registered students using college transport are provided bus ID cards or passes.',
'bus pass transport',3,'active'),

('faculty_qualification','Faculty',
'Are faculty members qualified?',
'Yes, faculty members are highly qualified with postgraduate, doctorate, and industry-level experience.',
'faculty qualification teachers',1,'active'),

('faculty_experience','Faculty',
'Do faculty members have teaching experience?',
'Yes, most faculty members have several years of teaching and practical industry experience.',
'faculty teaching experience',2,'active'),

('mentor_system','Faculty',
'Is there a mentor system?',
'Yes, each student is assigned a faculty mentor for academic guidance and personal development support.',
'mentor faculty guidance',2,'active'),

('faculty_support','Faculty',
'Can students contact faculty outside class?',
'Yes, students can meet faculty during working hours for academic guidance and doubt clarification.',
'faculty support doubts',2,'active'),

('guest_lectures','Faculty',
'Are guest lectures conducted?',
'Yes, guest lectures by industry experts and academicians are organized regularly to improve student knowledge.',
'guest lecture experts',2,'active');

INSERT INTO faqs
(intent, category, question, response, keywords, priority, status)
VALUES

('attendance_requirement','Academics',
'What is the minimum attendance required?',
'Students must maintain a minimum attendance percentage as prescribed by the university or college regulations. Students falling below the minimum attendance may not be allowed to appear for semester examinations unless approved under special conditions.',
'attendance minimum percentage',1,'active'),

('leave_application','Academics',
'How can I apply for leave?',
'Students can apply for leave through the department office or student portal by submitting a valid reason and supporting documents if required.',
'leave application student',2,'active'),

('academic_calendar','Academics',
'Where can I find the academic calendar?',
'The academic calendar is published on the official college website and includes important dates such as semester start, exams, holidays, and results.',
'academic calendar schedule',1,'active'),

('class_timings','Academics',
'What are the regular class timings?',
'Regular classes usually begin in the morning and continue until afternoon. Exact timings vary depending on the department and semester timetable.',
'class timings schedule',2,'active'),

('semester_break','Academics',
'When are semester breaks given?',
'Semester breaks are provided after the completion of examinations and before the start of the next semester as per the academic calendar.',
'semester break holidays',2,'active'),

('internal_exam_schedule','Academics',
'When are internal exams conducted?',
'Internal exams are conducted periodically during each semester to assess student performance before semester-end exams.',
'internal exam schedule',2,'active'),

('assignment_submission','Academics',
'How are assignments submitted?',
'Assignments can be submitted directly to faculty members or uploaded through the student portal depending on department instructions.',
'assignment submission portal',2,'active'),

('seminar_requirement','Academics',
'Are seminars mandatory?',
'Yes, seminars may be part of internal evaluation in certain subjects to improve presentation and communication skills.',
'seminar mandatory academics',3,'active'),

('project_guidance','Academics',
'Will faculty guide final year projects?',
'Yes, faculty members are assigned as project guides to support students in project planning, execution, and evaluation.',
'project guide faculty',2,'active'),

('lab_record_submission','Academics',
'Is lab record submission compulsory?',
'Yes, practical record books must be maintained and submitted for internal and practical evaluations.',
'lab record submission',2,'active'),

('library_membership','Library',
'How can students access the library?',
'Students are automatically registered as library members after admission and can borrow books using their student ID card.',
'library membership books',1,'active'),

('library_timings','Library',
'What are the library working hours?',
'The library is open during working days from morning to evening. Extended hours may be available during examinations.',
'library timings working hours',2,'active'),

('book_borrow_limit','Library',
'How many books can students borrow?',
'The number of books depends on the course and year of study. Usually students can borrow multiple books for a fixed period.',
'library borrow books limit',2,'active'),

('library_fine','Library',
'Is there a fine for late return of books?',
'Yes, late returns may result in fines according to library regulations.',
'library fine late return',2,'active'),

('ebook_access','Library',
'Can students access e-books?',
'Yes, students can access e-books and digital journals through the digital library portal.',
'ebook digital library',2,'active'),

('placement_registration','Placement',
'How can students register for placements?',
'Students can register through the placement cell portal by submitting their academic and personal details.',
'placement registration portal',1,'active'),

('placement_notifications','Placement',
'How are placement drives announced?',
'Placement drives are announced through email, notice boards, and the student placement portal.',
'placement notifications drive',2,'active'),

('company_selection_process','Placement',
'What is the company selection process?',
'The process usually includes aptitude tests, technical interviews, HR interviews, and group discussions depending on the company.',
'company selection process interview',2,'active'),

('placement_preparation','Placement',
'How should students prepare for placements?',
'Students should improve aptitude skills, communication, technical knowledge, and resume quality. Mock interviews and practice tests are highly recommended.',
'placement preparation training',2,'active'),

('internship_certificate','Placement',
'Will internship certificates be provided?',
'Yes, internship certificates are issued by the company or institution after successful completion of the internship.',
'internship certificate',3,'active'),

('hostel_admission','Hostel',
'How can I apply for hostel admission?',
'Students can apply for hostel accommodation by filling out the hostel application form and paying the required hostel fee.',
'hostel admission apply',1,'active'),

('hostel_allocation','Hostel',
'How are hostel rooms allocated?',
'Rooms are allocated based on availability, student preference, and application date.',
'hostel room allocation',2,'active'),

('hostel_rules_timings','Hostel',
'What are hostel entry and exit timings?',
'Hostel students must follow the timings set by the warden. Late entry requires prior permission.',
'hostel timing rules',2,'active'),

('hostel_leave_permission','Hostel',
'Do students need permission to leave hostel?',
'Yes, hostel students must obtain permission from the warden for overnight leave or extended absence.',
'hostel leave permission',2,'active'),

('hostel_warden_contact','Hostel',
'How can I contact the hostel warden?',
'Hostel warden contact details are available in the hostel office and student handbook.',
'hostel warden contact',3,'active'),

('canteen_timings','Facilities',
'What are the canteen working hours?',
'The canteen operates during college working hours and provides breakfast, lunch, and snacks.',
'canteen timings food',2,'active'),

('sports_admission','Sports',
'Can students join sports teams?',
'Yes, students can join college sports teams by participating in selection trials conducted by the physical education department.',
'sports team admission',2,'active'),

('sports_events','Sports',
'Does the college conduct sports events?',
'Yes, annual sports meets and inter-college competitions are organized regularly.',
'sports events competition',2,'active'),

('cultural_events','Events',
'Are cultural events conducted in college?',
'Yes, the college organizes annual cultural festivals, arts competitions, and celebration programs.',
'cultural events college',2,'active'),

('technical_fest','Events',
'Does the college conduct technical fests?',
'Yes, technical departments organize seminars, workshops, hackathons, and project exhibitions.',
'technical fest workshop',2,'active'),

('student_clubs','Student Life',
'Are there student clubs in college?',
'Yes, students can participate in literary clubs, coding clubs, arts clubs, and social service organizations.',
'student clubs activities',2,'active'),

('anti_ragging','Student Life',
'Does the college have an anti-ragging policy?',
'Yes, the college strictly follows anti-ragging rules and has a dedicated anti-ragging committee.',
'anti ragging policy',1,'active'),

('disciplinary_action','Student Life',
'What happens if students violate discipline?',
'Disciplinary action may include warning, suspension, or other actions depending on the seriousness of the violation.',
'disciplinary action rules',2,'active'),

('student_council','Student Life',
'Is there a student council?',
'Yes, the student council represents students in academic and extracurricular matters.',
'student council representation',2,'active'),

('complaint_cell','Support',
'How can students file complaints?',
'Students can file complaints through the grievance cell, online portal, or department office.',
'complaint grievance support',2,'active'),

('career_guidance','Support',
'Does the college provide career guidance?',
'Yes, career counseling sessions and guidance programs are regularly conducted for students.',
'career guidance counseling',2,'active'),

('psychological_support','Support',
'Is counseling support available for students?',
'Yes, counseling and psychological support services are available for student well-being.',
'student counseling support',2,'active'),

('alumni_network','General',
'Does the college have an alumni network?',
'Yes, the college maintains an active alumni network for student mentorship and career opportunities.',
'alumni network mentorship',3,'active'),

('certificate_course','Courses',
'Are certificate courses available along with degree programs?',
'Yes, students can enroll in value-added certificate courses to improve their skills and employability.',
'certificate courses skill',3,'active'),

('industry_training','Courses',
'Does the college provide industry training?',
'Yes, industry-based training programs and workshops are conducted regularly to improve practical skills.',
'industry training workshop',2,'active'),

('research_opportunities','Academics',
'Are research opportunities available for students?',
'Yes, students can participate in research projects, paper presentations, and innovation programs under faculty guidance.',
'research opportunities projects',3,'active'),

('innovation_cell','Academics',
'Is there an innovation or entrepreneurship cell?',
'Yes, the college supports innovation and entrepreneurship through startup cells and incubation support.',
'innovation entrepreneurship startup',3,'active'),

('nss_program','Activities',
'Is NSS available in the college?',
'Yes, National Service Scheme (NSS) activities are conducted for community service and social awareness.',
'nss community service',2,'active'),

('ncc_program','Activities',
'Is NCC available in the college?',
'Yes, eligible students can join NCC and participate in training and national-level camps.',
'ncc cadet training',2,'active'),

('study_tour','Activities',
'Does the college conduct study tours?',
'Yes, educational tours and industrial visits are organized for practical exposure.',
'study tour industrial visit',3,'active'),

('parent_meeting','General',
'Are parent-teacher meetings conducted?',
'Yes, parent-teacher meetings are organized periodically to discuss student progress and performance.',
'parent teacher meeting',2,'active'),

('student_portal','General',
'What is the student portal used for?',
'The student portal is used for fee payment, attendance tracking, exam registration, results, and academic updates.',
'student portal login services',1,'active'),

('identity_card','General',
'When will students receive ID cards?',
'Student ID cards are issued after admission confirmation and document verification.',
'student id card issue',2,'active'),

('uniform_requirement','General',
'Is uniform compulsory in college?',
'Uniform requirements depend on the course and department. Professional courses may have uniform regulations.',
'college uniform dress code',3,'active');

INSERT INTO faqs
(intent, category, question, response, keywords, priority, status)
VALUES

('college_timing','General',
'What are the college working hours?',
'The college usually functions from morning to evening on working days. Exact timings may vary depending on department schedules, practical sessions, and academic activities.',
'college timing working hours',1,'active'),

('holiday_list','General',
'Where can I find the holiday list?',
'The holiday list is published in the academic calendar and available on the official college website or notice board.',
'holiday list academic calendar',2,'active'),

('working_days','General',
'How many working days are there in a semester?',
'The number of working days depends on the academic calendar and university requirements, generally including regular classes, practicals, and internal assessments.',
'working days semester',2,'active'),

('college_location','General',
'Where is the college located?',
'The college location and address are available on the official website along with maps and transport details for student convenience.',
'college location address',1,'active'),

('contact_administration','Support',
'How can I contact the administration office?',
'Students and parents can contact the administration office through phone, email, or by visiting the campus during working hours.',
'administration contact office',1,'active'),

('contact_admission_office','Support',
'How can I contact the admission office?',
'The admission office can be contacted through the official helpline number, email address, or directly at the campus admission section.',
'admission office contact',1,'active'),

('lost_id_card','Support',
'What should I do if I lose my ID card?',
'Students should immediately report the loss to the administration office and apply for a duplicate ID card by paying the required fee.',
'lost id card duplicate',2,'active'),

('change_mobile_number','Support',
'How can I update my mobile number in college records?',
'Students can submit a request form to the administration office or update their profile through the student portal if the option is available.',
'update mobile number records',2,'active'),

('change_email','Support',
'How can I update my email address?',
'Students can request email updates through the student portal or submit a formal request to the academic office.',
'update email address student',2,'active'),

('migration_process','Documents',
'How can I apply for migration certificate after course completion?',
'Students can apply through the examination or academic office by submitting the application form and paying the prescribed fee.',
'migration certificate application',2,'active'),

('degree_certificate','Documents',
'When will I receive my degree certificate?',
'Degree certificates are usually issued after successful course completion and university approval. The timeline depends on university procedures.',
'degree certificate issue',2,'active'),

('provisional_certificate','Documents',
'How can I get a provisional certificate?',
'Students can apply for a provisional certificate after course completion by contacting the examination section.',
'provisional certificate apply',2,'active'),

('marklist_correction','Documents',
'How can I correct mistakes in my mark list?',
'Students should report errors to the examination office immediately with supporting documents for correction processing.',
'marklist correction errors',2,'active'),

('duplicate_certificate','Documents',
'How can I get duplicate certificates?',
'Duplicate certificates can be requested by applying with supporting documents and paying the applicable processing fee.',
'duplicate certificate apply',3,'active'),

('placement_offcampus','Placement',
'Does the college help with off-campus placements?',
'Yes, the placement cell provides guidance, notifications, and training support for off-campus job opportunities.',
'off campus placement support',2,'active'),

('startup_support','Placement',
'Does the college support startups?',
'Yes, students interested in entrepreneurship can access startup guidance, mentoring, and incubation support.',
'startup support entrepreneurship',3,'active'),

('industry_collaboration','Placement',
'Does the college have industry collaborations?',
'Yes, the college collaborates with industries for internships, training, workshops, and placement opportunities.',
'industry collaboration internships',2,'active'),

('placement_alumni_help','Placement',
'Do alumni help in placements?',
'Yes, alumni often contribute through referrals, mentorship, and placement support for current students.',
'alumni placement support',3,'active'),

('higher_studies_guidance','Placement',
'Does the college guide students for higher studies?',
'Yes, students receive guidance for higher education options, entrance exams, and application processes.',
'higher studies guidance',2,'active'),

('foreign_studies_support','Placement',
'Does the college help with foreign studies?',
'Yes, counseling is provided for overseas education, entrance tests, and university application guidance.',
'foreign studies abroad guidance',3,'active'),

('hostel_laundry','Hostel',
'Is laundry facility available in hostel?',
'Yes, laundry facilities are available either inside the hostel or through authorized service providers.',
'hostel laundry service',3,'active'),

('hostel_study_room','Hostel',
'Are study rooms available in hostel?',
'Yes, common study areas and quiet study rooms are available for hostel students.',
'hostel study room',2,'active'),

('hostel_power_backup','Hostel',
'Does the hostel have power backup?',
'Yes, hostels are equipped with power backup facilities for uninterrupted electricity during outages.',
'hostel power backup',2,'active'),

('hostel_hot_water','Hostel',
'Is hot water available in hostel?',
'Yes, hot water facilities are provided according to hostel timings and infrastructure.',
'hostel hot water',3,'active'),

('hostel_internet_speed','Hostel',
'How is the hostel internet speed?',
'Internet speed in the hostel is suitable for academic work, online classes, and general browsing.',
'hostel internet wifi speed',3,'active'),

('sports_scholarship_apply','Sports',
'How can I apply for sports scholarships?',
'Eligible students can apply through the sports department by submitting achievement certificates and application forms.',
'sports scholarship apply',2,'active'),

('sports_coach','Sports',
'Are professional coaches available?',
'Yes, trained coaches are available for selected sports and athletic programs.',
'sports coach training',2,'active'),

('gym_trainer','Sports',
'Is a gym trainer available?',
'Yes, gym trainers are available to guide students on fitness and exercise routines.',
'gym trainer fitness',3,'active'),

('intercollege_competition','Sports',
'Can students participate in inter-college competitions?',
'Yes, students can represent the college in university and inter-college competitions based on selection.',
'inter college sports competition',2,'active'),

('cultural_club_join','Events',
'How can students join cultural clubs?',
'Students can register during club enrollment periods announced by the college cultural committee.',
'cultural club registration',2,'active'),

('event_participation_certificate','Events',
'Do students receive certificates for events?',
'Yes, participation and achievement certificates are issued for eligible college events and competitions.',
'event participation certificate',2,'active'),

('fest_registration','Events',
'How can I register for college fest?',
'Fest registration details are announced through notice boards, department groups, and student portals.',
'fest registration event',2,'active'),

('workshop_certificate','Events',
'Will workshop participants get certificates?',
'Yes, workshop completion certificates are issued to participants after successful attendance and participation.',
'workshop certificate training',2,'active'),

('seminar_registration','Events',
'How can students register for seminars?',
'Students can register through department coordinators or online registration forms provided for each seminar.',
'seminar registration',2,'active'),

('internship_mandatory','Academics',
'Is internship mandatory for all students?',
'Internship requirements depend on the course curriculum. Professional and technical programs often require internships.',
'internship mandatory curriculum',2,'active'),

('industrial_visit','Academics',
'Are industrial visits organized?',
'Yes, departments organize industrial visits to provide students practical exposure to industry operations.',
'industrial visit practical learning',2,'active'),

('online_classes','Academics',
'Are online classes available?',
'Yes, online classes may be conducted when required for special sessions, bridge courses, or emergency situations.',
'online classes learning',2,'active'),

('recorded_classes','Academics',
'Are recorded lectures available?',
'Some departments provide recorded lectures or digital learning materials for student reference.',
'recorded lectures digital learning',3,'active'),

('student_login_issue','Support',
'I cannot log in to the student portal. What should I do?',
'Students should verify their login credentials first. If the issue continues, contact technical support or the administration office for password reset assistance.',
'student portal login issue',1,'active'),

('forgot_password','Support',
'What if I forgot my portal password?',
'Students can reset their password using the forgot password option or contact the support team for help.',
'forgot password portal reset',1,'active'),

('wifi_login_issue','Support',
'I cannot connect to campus WiFi. What should I do?',
'Students should verify login credentials and device settings. If the issue persists, contact the IT support team.',
'wifi login issue support',2,'active'),

('fee_payment_failed','Support',
'What should I do if my fee payment fails?',
'If fee payment fails but the amount is deducted, wait for confirmation. If unresolved, contact the accounts office with transaction details.',
'fee payment failed transaction',1,'active'),

('certificate_delay','Support',
'Why is my certificate delayed?',
'Certificate processing may take time due to verification or university approval procedures. Students can check status with the academic office.',
'certificate delayed processing',2,'active'),

('exam_registration_issue','Support',
'I cannot register for exams. What should I do?',
'Ensure fees are cleared and eligibility requirements are met. If the issue continues, contact the examination office immediately.',
'exam registration issue',1,'active'),

('placement_login_issue','Support',
'I cannot access the placement portal. What should I do?',
'Students should verify their credentials and internet connection. For unresolved issues, contact the placement cell technical support.',
'placement portal login issue',2,'active'),

('graduation_day','General',
'Does the college conduct a graduation ceremony?',
'Yes, graduation ceremonies are organized for students who successfully complete their programs and receive official recognition.',
'graduation ceremony convocation',2,'active'),

('alumni_registration','General',
'How can graduates join the alumni association?',
'Graduates can register through the alumni portal or contact the alumni office to become members and stay connected.',
'alumni registration association',3,'active'),

('college_updates','General',
'How can I receive college updates?',
'Students can receive updates through the official website, email notifications, student portal, and department communication groups.',
'college updates notifications',1,'active');