INSERT INTO admins
(username, password_hash, email, role, status, last_login)
VALUES
(
  'admin1',
  SHA2(CONCAT('admin1','1234'), 256),
  'admin1@college.com',
  'admin',
  'active',
  NULL
),
(
  'staff1',
  SHA2(CONCAT('staff1','1234'), 256),
  'staff1@college.com',
  'staff',
  'active',
  NULL
);