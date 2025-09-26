-- Wait for users table to be created, then insert admin user
-- This will be executed after the application creates the table structure

DO $$
BEGIN
    -- Wait and retry logic for table creation
    FOR i IN 1..30 LOOP
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
            -- Insert admin user with bcrypt hash for 'admin123'
            INSERT INTO users (name, email, password, role, "createdAt", "updatedAt") 
            VALUES (
                'Admin User',
                'admin@wfh.com',
                '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
                'admin',
                NOW(),
                NOW()
            ) ON CONFLICT (email) DO NOTHING;
            
            RAISE NOTICE 'Admin user created: admin@wfh.com / admin123';
            EXIT;
        END IF;
        
        PERFORM pg_sleep(2);
    END LOOP;
END $$;
