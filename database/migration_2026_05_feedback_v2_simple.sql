/* ============================================================
   Migration: NEW Simple User Experience Feedback System
   - Removes all old feedback tables
   - Creates a lightweight user_experience_feedback table
   ============================================================ */

SET FOREIGN_KEY_CHECKS = 0;

-- Drop all old feedback tables
DROP TABLE IF EXISTS chat_feedback;

-- Create the new simple feedback table
CREATE TABLE user_experience_feedback (
  id INT PRIMARY KEY AUTO_INCREMENT,
  star_rating TINYINT NOT NULL,
  feedback_category ENUM(
    'Helpful Response',
    'Incorrect Answer',
    'Slow Response',
    'UI Issue',
    'Translation Problem',
    'Other'
  ) NOT NULL,
  feedback_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
