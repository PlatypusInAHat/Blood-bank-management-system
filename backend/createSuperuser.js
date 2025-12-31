const { User, sequelize, syncDatabase } = require('./src/models');
const bcrypt = require('bcrypt');

const createSuperUser = async () => {
  try {
    console.log('🔄 Connecting to database...');
    
    // Authenticate connection with timeout
    try {
      await Promise.race([
        sequelize.authenticate(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), 10000))
      ]);
      console.log('✅ Database connected!');
    } catch (error) {
      console.error('❌ Cannot connect to database:', error.message);
      console.error('Please ensure PostgreSQL is running and credentials in .env are correct');
      process.exit(1);
    }

    console.log('🔄 Syncing database...');
    await syncDatabase();
    
    const email = 'admin@example.com';
    const password = 'admin123456';
    const name = 'Admin User';

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('ℹ️  User already exists:', email);
      process.exit(0);
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create superuser
    console.log('👤 Creating superuser...');
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    });

    console.log('✅ Superuser created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Name:', name);
    console.log('🔑 Role:', user.role);
    console.log('\n✨ You can now login with these credentials!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating superuser:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
};

// Run script
createSuperUser();
