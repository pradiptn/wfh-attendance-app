const bcrypt = require('bcrypt');
const { Client } = require('pg');

async function seedAdmin() {
  const client = new Client({
    host: 'auth-db',
    port: 5432,
    database: 'auth_db',
    user: 'postgres',
    password: 'password',
  });

  try {
    await client.connect();
    console.log('Connected to auth database');
    
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
  } finally {
    await client.end();
  }
}

seedAdmin();
