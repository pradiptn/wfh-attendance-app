const bcrypt = require('bcrypt');
const { Client } = require('pg');

async function seedAdmin() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'wfh_attendance',
    user: 'postgres',
    password: 'password', // Update with your DB password
  });

  try {
    await client.connect();
    
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
  } finally {
    await client.end();
  }
}

seedAdmin();
