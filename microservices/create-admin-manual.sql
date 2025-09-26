-- Manual admin user creation
-- Run this directly in the database

INSERT INTO users (name, email, password, role, "createdAt", "updatedAt") 
VALUES (
    'Admin User',
    'admin@wfh.com',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    password = EXCLUDED.password,
    "updatedAt" = NOW();

-- Verify the user was created
SELECT id, name, email, role FROM users WHERE email = 'admin@wfh.com';
