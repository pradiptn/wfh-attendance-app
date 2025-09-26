-- Default Admin User Seed
-- Password: admin123 (hashed with bcrypt)

INSERT INTO users (name, email, password, role, "createdAt", "updatedAt") 
VALUES (
  'Admin User',
  'admin@wfh.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: admin123
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;
