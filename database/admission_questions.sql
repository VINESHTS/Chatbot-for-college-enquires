INSERT INTO admission_questions
(intent, category, question, answer, priority, status)
VALUES

-- 1-10 General Admission
('admission_process','general','What is the admission process?',
'The admission process starts with selecting your course, filling out the application form, submitting required documents, paying the application fee, attending counseling if required, and confirming admission after selection.',1,'active'),

('admission_eligibility','general','What are the eligibility criteria for admission?',
'Eligibility criteria depend on the course. Generally, undergraduate programs require completion of higher secondary education, while postgraduate programs require a relevant bachelor’s degree.',1,'active'),

('application_mode','general','How can I apply for admission?',
'Students can apply through the online admission portal by registering, filling in personal and academic details, uploading documents, and paying the application fee.',2,'active'),

('admission_dates','general','When does admission start?',
'Admissions usually start before the academic year begins. Exact dates are announced on the official college website and admission notification section.',2,'active'),

('application_fee','general','Is there an application fee?',
'Yes, applicants are required to pay a non-refundable application fee while submitting the admission form. The fee amount varies by course.',2,'active'),

('multiple_courses','general','Can I apply for multiple courses?',
'Yes, students may apply for multiple courses if they meet the eligibility requirements. Separate application fees may apply for each course.',3,'active'),

('offline_admission','general','Is offline admission available?',
'Most admissions are processed online. However, offline support may be available at the admission office for special cases.',3,'active'),

('admission_confirmation','general','How is admission confirmed?',
'Admission is confirmed after document verification, fee payment, and receiving the official admission confirmation letter.',2,'active'),

('late_application','general','Can I apply after the deadline?',
'Late applications may be accepted only if seats are available and with approval from the admission office.',4,'active'),

('admission_helpdesk','general','How can I contact the admission office?',
'Students can contact the admission office through phone, email, or by visiting the campus during office hours.',3,'active'),

-- 11-20 Eligibility
('minimum_marks','eligibility','What is the minimum mark required for UG admission?',
'The minimum mark required for undergraduate admission is usually 50% in the qualifying examination, but this may vary by course.',1,'active'),

('pg_eligibility','eligibility','What is required for PG admission?',
'For postgraduate admission, students must have completed a bachelor’s degree in a relevant field with the required minimum percentage.',1,'active'),

('age_limit','eligibility','Is there an age limit for admission?',
'Most courses do not have a strict age limit, but certain professional programs may have age restrictions.',3,'active'),

('entrance_exam','eligibility','Is an entrance exam required?',
'Some professional and specialized courses require entrance exam scores, while many regular courses admit based on academic merit.',2,'active'),

('sports_quota','eligibility','Is sports quota available?',
'Yes, eligible students with recognized sports achievements may apply under sports quota as per institutional policies.',3,'active'),

('management_quota','eligibility','Is management quota available?',
'Yes, management quota seats may be available for certain courses based on institutional guidelines.',3,'active'),

('reservation_policy','eligibility','Is reservation available?',
'Reservation is provided as per government norms for SC, ST, OBC, EWS, and other eligible categories.',2,'active'),

('foreign_students','eligibility','Can international students apply?',
'Yes, international students can apply by submitting equivalent academic certificates and valid visa documents.',2,'active'),

('gap_year','eligibility','Can students with gap years apply?',
'Yes, students with gap years can apply if they provide valid explanations and required documents.',4,'active'),

('transfer_students','eligibility','Can transfer students apply?',
'Transfer admissions may be considered based on seat availability and university transfer policies.',4,'active'),

-- 21-30 Documents
('required_documents','documents','What documents are required for admission?',
'Students need mark sheets, transfer certificate, ID proof, passport-size photos, and category certificates if applicable.',1,'active'),

('migration_certificate','documents','Is a migration certificate required?',
'Migration certificates are required for students coming from other boards or universities.',2,'active'),

('community_certificate','documents','Is community certificate mandatory?',
'Community certificates are mandatory only for students applying under reservation categories.',3,'active'),

('income_certificate','documents','Do I need an income certificate?',
'Income certificates may be required for scholarships and fee concessions.',3,'active'),

('original_documents','documents','Should original documents be submitted?',
'Original documents are required for verification, but they are usually returned after the process.',2,'active'),

('document_upload','documents','Can documents be uploaded online?',
'Yes, scanned copies of required documents can be uploaded during the online application process.',2,'active'),

('photo_signature','documents','Are photo and signature uploads required?',
'Yes, applicants must upload recent passport-size photos and digital signatures.',2,'active'),

('document_verification','documents','When is document verification done?',
'Document verification is usually conducted after application submission or during counseling.',2,'active'),

('missing_documents','documents','What if I miss a document?',
'Applicants may be given time to submit missing documents before final admission confirmation.',4,'active'),

('certificate_format','documents','In what format should certificates be uploaded?',
'Certificates should be uploaded in PDF or image format as specified in the admission portal.',3,'active'),

-- 31-40 Fees
('fee_payment','fees','How can I pay admission fees?',
'Fees can be paid online using debit card, credit card, UPI, or net banking through the official portal.',1,'active'),

('refund_policy','fees','Is the admission fee refundable?',
'Admission fee refund policies depend on the stage of cancellation and institutional regulations.',2,'active'),

('installment_payment','fees','Can fees be paid in installments?',
'Some courses allow installment-based fee payment. Students should check with the accounts department.',3,'active'),

('hostel_fee','fees','Is hostel fee included in admission fee?',
'No, hostel fees are usually separate from tuition and admission fees.',2,'active'),

('scholarship_fee','fees','Can scholarship reduce fees?',
'Yes, eligible scholarships can reduce the total fee burden based on scholarship terms.',2,'active'),

('fee_receipt','fees','Will I receive a fee receipt?',
'Yes, a digital fee receipt is generated immediately after successful payment.',2,'active'),

('payment_failure','fees','What if payment fails?',
'If payment fails, students should wait for confirmation or contact support before retrying.',3,'active'),

('fee_deadline','fees','What is the fee payment deadline?',
'Fee payment deadlines are mentioned in the admission offer letter and portal.',2,'active'),

('extra_fee','fees','Are there any extra charges?',
'Additional charges may include lab fees, exam fees, library fees, and hostel fees.',3,'active'),

('fee_concession','fees','Is fee concession available?',
'Fee concessions may be available for eligible students based on merit or financial background.',3,'active'),

-- 41-50 Merit List
('merit_list','selection','How is the merit list prepared?',
'The merit list is prepared based on academic performance, entrance exam marks, and reservation policies.',1,'active'),

('merit_release','selection','When is the merit list published?',
'The merit list is published after the application review process on the official website.',2,'active'),

('selection_notification','selection','How will I know if I am selected?',
'Selected candidates receive notifications through email, SMS, or portal updates.',2,'active'),

('waiting_list','selection','What is a waiting list?',
'A waiting list includes applicants who may get admission if selected candidates withdraw.',2,'active'),

('rank_list','selection','Is there a rank list?',
'Yes, rank lists may be published for certain competitive courses.',3,'active'),

('cutoff_marks','selection','What are cutoff marks?',
'Cutoff marks are the minimum marks required for selection in a specific course.',2,'active'),

('interview_selection','selection','Is there an interview process?',
'Some courses include interviews or group discussions as part of selection.',3,'active'),

('spot_admission','selection','What is spot admission?',
'Spot admission is conducted for vacant seats after regular admission rounds.',4,'active'),

('selection_rounds','selection','How many selection rounds are there?',
'Selection rounds vary depending on seat availability and course demand.',3,'active'),

('counseling_process','selection','What is admission counseling?',
'Counseling helps students finalize course selection, document verification, and fee payment.',2,'active'),

-- 51-60 Scholarships
('scholarship_apply','scholarship','How can I apply for scholarships?',
'Scholarships can be applied through the scholarship portal or college office by submitting required documents.',2,'active'),

('merit_scholarship','scholarship','Are merit scholarships available?',
'Yes, merit scholarships are offered to academically outstanding students.',2,'active'),

('government_scholarship','scholarship','Can I apply for government scholarships?',
'Yes, eligible students can apply for state and central government scholarships.',2,'active'),

('minority_scholarship','scholarship','Are minority scholarships available?',
'Yes, minority students can apply for scholarships under approved government schemes.',3,'active'),

('sports_scholarship','scholarship','Is there a sports scholarship?',
'Students with outstanding sports achievements may be eligible for sports scholarships.',3,'active'),

('scholarship_deadline','scholarship','What is the scholarship deadline?',
'Scholarship deadlines vary and are announced separately.',3,'active'),

('scholarship_renewal','scholarship','Can scholarships be renewed?',
'Yes, scholarships can be renewed based on academic performance and attendance.',3,'active'),

('financial_aid','scholarship','Is financial aid available?',
'Yes, financial aid may be available for economically weaker students.',3,'active'),

('scholarship_eligibility','scholarship','Who is eligible for scholarships?',
'Eligibility depends on merit, category, income level, and scholarship type.',2,'active'),

('scholarship_documents','scholarship','What documents are needed for scholarships?',
'Income certificate, mark sheets, ID proof, and bank details are usually required.',2,'active'),

-- 61-70 Hostel
('hostel_admission','hostel','How can I apply for hostel?',
'Hostel applications can be submitted after admission confirmation through the hostel office or portal.',2,'active'),

('hostel_availability','hostel','Is hostel available for all students?',
'Hostel seats are limited and allotted based on availability and priority.',2,'active'),

('hostel_fee_structure','hostel','What is the hostel fee structure?',
'Hostel fees vary based on room type, facilities, and duration of stay.',3,'active'),

('hostel_facilities','hostel','What facilities are available in hostel?',
'Hostels provide accommodation, food, internet, security, and study spaces.',3,'active'),

('hostel_rules','hostel','What are hostel rules?',
'Students must follow hostel timing, discipline, and safety regulations.',3,'active'),

('hostel_refund','hostel','Is hostel fee refundable?',
'Refund policies depend on hostel regulations and cancellation timing.',4,'active'),

('mess_facility','hostel','Is mess facility compulsory?',
'Mess facility may be compulsory in some hostels and optional in others.',3,'active'),

('hostel_selection','hostel','How are hostel seats allotted?',
'Seats are allotted based on distance, merit, and special categories.',3,'active'),

('girls_hostel','hostel','Is separate hostel available for girls?',
'Yes, separate hostel facilities are available for girls with enhanced security.',2,'active'),

('boys_hostel','hostel','Is separate hostel available for boys?',
'Yes, separate hostel facilities are available for boys.',2,'active'),

-- 71-80 Cancellation
('cancel_admission','cancellation','Can I cancel my admission?',
'Yes, students can cancel admission by submitting a cancellation request to the admission office.',2,'active'),

('fee_refund_cancel','cancellation','Will I get fee refund after cancellation?',
'Refund depends on institutional refund policy and cancellation timing.',2,'active'),

('document_return','cancellation','Will my original documents be returned?',
'Yes, original documents will be returned after completing cancellation formalities.',2,'active'),

('seat_transfer','cancellation','Can I transfer my seat to another student?',
'No, seats are non-transferable.',1,'active'),

('withdrawal_process','cancellation','What is the withdrawal process?',
'Students must submit a written application and clear dues before withdrawal.',3,'active'),

('partial_refund','cancellation','Is partial refund available?',
'Partial refunds may be available as per refund guidelines.',3,'active'),

('cancel_deadline','cancellation','Is there a cancellation deadline?',
'Cancellation deadlines are specified in admission guidelines.',3,'active'),

('reapply_after_cancel','cancellation','Can I reapply after cancellation?',
'Yes, students can reapply in future admission cycles.',4,'active'),

('cancel_online','cancellation','Can admission be canceled online?',
'In some cases, online cancellation is allowed through the portal.',4,'active'),

('cancel_hostel','cancellation','How to cancel hostel admission?',
'Hostel cancellation requires separate application to hostel administration.',4,'active'),

-- 81-100 Miscellaneous
('orientation','general','Is there an orientation program?',
'Yes, orientation programs are conducted for new students before classes begin.',3,'active'),

('class_start','general','When do classes start?',
'Classes usually begin after the admission process and orientation program.',2,'active'),

('id_card','general','When will I get my student ID card?',
'Student ID cards are issued after admission confirmation and fee payment.',3,'active'),

('uniform','general','Is uniform compulsory?',
'Uniform requirements depend on the department and course.',4,'active'),

('transport','general','Is transport facility available?',
'Yes, transportation services may be available for students from nearby areas.',3,'active'),

('library_access','general','Can new students use the library?',
'Yes, library access is available after student registration is completed.',3,'active'),

('semester_system','general','How does the semester system work?',
'The academic year is divided into semesters with exams and internal assessments.',3,'active'),

('attendance_rule','general','What is the minimum attendance requirement?',
'Students are generally required to maintain at least 75% attendance.',2,'active'),

('student_portal','general','What is the student portal?',
'The student portal provides access to academic records, fee details, attendance, and announcements.',3,'active'),

('academic_calendar','general','Where can I find the academic calendar?',
'The academic calendar is available on the official college website and student portal.',2,'active'),

('course_change','general','Can I change my course after admission?',
'Course change may be allowed within a specified period based on seat availability and approval.',4,'active'),

('section_change','general','Can I change my class section?',
'Section changes may be allowed under valid circumstances with approval.',4,'active'),

('student_support','general','Is student support available?',
'Yes, counseling, mentoring, and support services are available for students.',3,'active'),

('anti_ragging','general','Is anti-ragging declaration required?',
'Yes, students must submit anti-ragging declarations as per regulations.',2,'active'),

('medical_checkup','general','Is medical checkup required?',
'Some courses may require medical fitness certificates.',3,'active'),

('internship_info','general','Are internships part of the course?',
'Many courses include internships as part of the curriculum.',3,'active'),

('placement_support','general','Does the college provide placement support?',
'Yes, placement training and recruitment assistance are provided to eligible students.',2,'active'),

('alumni_network','general','Is there an alumni network?',
'Yes, students can connect with alumni for guidance and career support.',4,'active'),

('exam_registration','general','How do I register for semester exams?',
'Exam registration is done through the student portal during notified dates.',3,'active'),

('certificate_issue','general','When will certificates be issued?',
'Certificates are issued after successful completion of the course and formal clearance.',3,'active');