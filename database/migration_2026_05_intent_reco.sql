-- Migration: improve intent/recommendation/search/logging schema support
-- Safe-ish migration for existing deployments.

SET NAMES utf8mb4;

ALTER TABLE users_queries
  ADD COLUMN IF NOT EXISTS language_code VARCHAR(10) DEFAULT 'en' AFTER response_given;

CREATE INDEX idx_uq_language ON users_queries (language_code);

CREATE INDEX idx_departments_name ON departments (dept_name);
CREATE INDEX idx_courses_name ON courses (course_name);
CREATE INDEX idx_courses_department ON courses (department);
CREATE INDEX idx_fee_course_name ON fee_structure (course_name);
CREATE INDEX idx_fee_type ON fee_structure (fee_type);
CREATE INDEX idx_scholarships_name ON scholarships (name);
CREATE INDEX idx_scholarships_deadline ON scholarships (application_deadline);
CREATE INDEX idx_hostel_type ON hostel_information (type);
CREATE INDEX idx_placement_company ON placement_support (company_name);
CREATE INDEX idx_contact_department ON contact_support (department);
CREATE INDEX idx_important_dates_date ON important_dates (date);
CREATE INDEX idx_faq_translations_lang ON faq_translations (language_code);
CREATE INDEX idx_aq_translations_lang ON admission_question_translations (language_code);
CREATE INDEX idx_admins_role ON admins (role);
CREATE INDEX idx_aal_action ON admin_activity_logs (action_type);
CREATE INDEX idx_aal_target ON admin_activity_logs (target_table, target_id);

-- Optional fulltext acceleration for FAQ/Admission semantic lookup.
ALTER TABLE faqs ADD FULLTEXT KEY ftx_faq_question_response (question, response);
ALTER TABLE admission_questions ADD FULLTEXT KEY ftx_admission_question_answer (question, answer);

-- Keep admin emails unique.
ALTER TABLE admins ADD UNIQUE KEY uq_admin_email (email);

