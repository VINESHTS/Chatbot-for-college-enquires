/* ============================================================
   College Enquiry Chatbot — New FK-driven Schema
   DATABASE: college_enquiry_chatbot
   ============================================================ */

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users_queries;

DROP TABLE IF EXISTS admin_activity_logs;
DROP TABLE IF EXISTS admins;

DROP TABLE IF EXISTS admission_question_translations;
DROP TABLE IF EXISTS admission_questions;

DROP TABLE IF EXISTS faq_translations;
DROP TABLE IF EXISTS faqs;

DROP TABLE IF EXISTS placement_support;
DROP TABLE IF EXISTS scholarships;
DROP TABLE IF EXISTS fee_structure;
DROP TABLE IF EXISTS important_dates;
DROP TABLE IF EXISTS contact_support;
DROP TABLE IF EXISTS hostel_information;

DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS departments;



SET FOREIGN_KEY_CHECKS = 1;

SET NAMES utf8mb4;
SET time_zone = '+00:00';



CREATE TABLE departments (
  dept_id INT PRIMARY KEY AUTO_INCREMENT,
  dept_name VARCHAR(160) NOT NULL,
  head_name VARCHAR(160) NULL,
  contact_email VARCHAR(160) NULL,
  contact_phone VARCHAR(40) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_departments_name (dept_name),
  INDEX idx_departments_name (dept_name)
) ENGINE=InnoDB;

CREATE TABLE courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  dept_id INT NOT NULL,
  course_name VARCHAR(180) NOT NULL,
  course_description TEXT NULL,
  duration VARCHAR(64) NULL,
  fee DECIMAL(12,2) NULL,
  eligibility TEXT NULL,
  intake_capacity INT NULL,
  admission_start_date DATE NULL,
  admission_end_date DATE NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uq_courses_name (course_name),
  INDEX idx_courses_name (course_name),
  INDEX idx_courses_dept_id (dept_id),
  INDEX idx_courses_status (status),

  CONSTRAINT fk_courses_departments
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE fee_structure (
  fee_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  semester_no TINYINT NULL,
  fee_type VARCHAR(100) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  duration VARCHAR(64) NULL,
  description TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_fee_course_id (course_id),
  INDEX idx_fee_type (fee_type),
  INDEX idx_fee_semester (semester_no),
  INDEX idx_fee_status (status),

  CONSTRAINT fk_fee_courses
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE scholarships (
  scholarship_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NULL,
  name VARCHAR(180) NOT NULL,
  eligibility TEXT NULL,
  amount VARCHAR(120) NULL,
  application_deadline DATE NULL,
  description TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_scholarships_name (name),
  INDEX idx_scholarships_course_id (course_id),
  INDEX idx_scholarships_deadline (application_deadline),
  INDEX idx_scholarships_status (status),

  CONSTRAINT fk_scholarships_courses
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE hostel_information (
  hostel_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(120) NOT NULL,
  fee DECIMAL(12,2) NULL,
  facilities TEXT NULL,
  total_rooms INT NULL,
  available_rooms INT NULL,
  warden_name VARCHAR(160) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_hostel_type (type),
  INDEX idx_hostel_status (status)
) ENGINE=InnoDB;

CREATE TABLE placement_support (
  placement_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NULL,
  company_name VARCHAR(180) NOT NULL,
  package VARCHAR(120) NULL,
  success_rate VARCHAR(80) NULL,
  roles_offered TEXT NULL,
  hiring_year YEAR NOT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_placement_course_id (course_id),
  INDEX idx_placement_company (company_name),
  INDEX idx_placement_year (hiring_year),
  INDEX idx_placement_status (status),

  CONSTRAINT fk_placements_courses
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE contact_support (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  dept_id INT NOT NULL,
  department VARCHAR(160) NULL,
  contact_person VARCHAR(160) NULL,
  email VARCHAR(160) NULL,
  phone VARCHAR(40) NULL,
  office_hours VARCHAR(160) NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_contact_dept_id (dept_id),
  INDEX idx_contact_status (status),

  CONSTRAINT fk_contact_departments
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE important_dates (
  event_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NULL,
  event_type ENUM('admission','exam','semester','placement','scholarship','hostel','general') NOT NULL DEFAULT 'general',
  event_name VARCHAR(200) NOT NULL,
  date DATE NOT NULL,
  description TEXT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_important_dates_course_id (course_id),
  INDEX idx_important_dates_type (event_type),
  INDEX idx_important_dates_date (date),
  INDEX idx_important_dates_name (event_name),
  INDEX idx_important_dates_status (status),

  CONSTRAINT fk_dates_courses
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE faqs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  intent VARCHAR(100) NULL,
  category VARCHAR(80) NOT NULL,
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  keywords TEXT NULL,
  priority TINYINT NOT NULL DEFAULT 5,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_faqs_intent (intent),
  INDEX idx_faqs_category (category),
  INDEX idx_faqs_status (status),
  INDEX idx_faqs_priority (priority)
) ENGINE=InnoDB;

CREATE TABLE faq_translations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  faq_id BIGINT NOT NULL,
  language_code VARCHAR(10) NOT NULL,
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uq_faq_lang (faq_id, language_code),
  INDEX idx_faq_translations_lang (language_code),

  CONSTRAINT fk_faq_translations_faq
    FOREIGN KEY (faq_id) REFERENCES faqs(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE admission_questions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  intent VARCHAR(100) NULL,
  category VARCHAR(80) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  priority TINYINT NOT NULL DEFAULT 5,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_admission_category (category),
  INDEX idx_admission_intent (intent),
  INDEX idx_admission_priority (priority),
  INDEX idx_admission_status (status)
) ENGINE=InnoDB;

CREATE TABLE admission_question_translations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  question_id BIGINT NOT NULL,
  language_code VARCHAR(10) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uq_aq_lang (question_id, language_code),
  INDEX idx_aq_translations_lang (language_code),

  CONSTRAINT fk_aq_translations_question
    FOREIGN KEY (question_id) REFERENCES admission_questions(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE admins (
  admin_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(180) NOT NULL,
  role ENUM('admin','staff','superadmin') NOT NULL DEFAULT 'admin',
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL DEFAULT NULL,

  UNIQUE KEY uq_admins_username (username),
  UNIQUE KEY uq_admins_email (email),
  INDEX idx_admins_role (role),
  INDEX idx_admins_status (status)
) ENGINE=InnoDB;

CREATE TABLE admin_activity_logs (
  log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  admin_id BIGINT NOT NULL,
  action_type VARCHAR(100) NOT NULL,
  target_table VARCHAR(120) NULL,
  target_id VARCHAR(64) NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  details TEXT NULL,

  INDEX idx_aal_admin_ts (admin_id, `timestamp`),
  INDEX idx_aal_action (action_type),
  INDEX idx_aal_target (target_table, target_id),

  CONSTRAINT fk_aal_admins
    FOREIGN KEY (admin_id) REFERENCES admins(admin_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE users_queries (
  query_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id CHAR(36) NULL,
  user_input TEXT NOT NULL,
  matched_intent VARCHAR(100) NULL,
  response_given TEXT NULL,
  language_code VARCHAR(10) NOT NULL DEFAULT 'en',
  response_status ENUM('answered','unanswered','partial','error') NOT NULL DEFAULT 'answered',
  confidence_score DECIMAL(5,4) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_uq_created (created_at),
  INDEX idx_uq_intent (matched_intent),
  INDEX idx_uq_language (language_code),
  INDEX idx_uq_session_id (session_id)
) ENGINE=InnoDB;

/* FULLTEXT indexes (MySQL 8 / InnoDB) */
ALTER TABLE faqs
  ADD FULLTEXT KEY ftx_faqs_qr_kw (question, response, keywords);

ALTER TABLE admission_questions
  ADD FULLTEXT KEY ftx_admission_qa (question, answer);

ALTER TABLE users_queries
  ADD FULLTEXT KEY ftx_users_queries_input_response (user_input, response_given);

