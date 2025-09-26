const bcrypt = require('bcrypt');
const { Client } = require('pg');

async function waitForTable() {
  const client = new Client({
    host: 'employee-db',
    port: 5432,
    database: 'employee_db',
    user: 'postgres',
    password: 'password',
  });

  let retries = 30;
  while (retries > 0) {
    try {
      await client.connect();
      
      // Check if users table exists
      const result = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'users'
        );
      `);
      
      if (result.rows[0].exists) {
        console.log('✅ Users table found, creating admin user...');
        await createAdmin(client);
        break;
      } else {
        console.log('⏳ Waiting for users table to be created...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        retries--;
      }
      
      await client.end();
    } catch (error) {
      console.log(`⏳ Waiting for database... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      retries--;
    }
  }
  
  if (retries === 0) {
    console.error('❌ Timeout waiting for users table');
    process.exit(1);
  }
}

async function createAdmin(client) {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const query = `
      INSERT INTO users (name, email, password, role, "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, NOW(), NOW()) 
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, role;
    `;
    
    const result = await client.query(query, [
      'Admin User',
      'admin@wfh.com',
      hashedPassword,
      'admin'
    ]);
    
    if (result.rows.length > 0) {
      console.log('✅ Admin user created successfully:');
      console.log('Email: admin@wfh.com');
      console.log('Password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

waitForTable();
