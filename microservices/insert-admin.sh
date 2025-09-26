#!/bin/bash

echo "Inserting admin user directly into database..."

# Execute SQL directly in the auth-db container
docker-compose exec auth-db psql -U postgres -d auth_db -c "
INSERT INTO users (name, email, password, role, \"createdAt\", \"updatedAt\") 
VALUES (
    'Admin User',
    'admin@wfh.com',
    '\$2b\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    password = EXCLUDED.password,
    \"updatedAt\" = NOW();
"

echo "Verifying admin user..."
docker-compose exec auth-db psql -U postgres -d auth_db -c "
SELECT id, name, email, role FROM users WHERE email = 'admin@wfh.com';
"

echo ""
echo "Admin credentials:"
echo "Email: admin@wfh.com"
echo "Password: admin123"
