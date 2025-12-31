require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
    }
);

async function testConnection() {
    try {
        console.log('🔄 Testing database connection...');
        console.log(`📍 Host: ${process.env.DB_HOST}`);
        console.log(`🔌 Port: ${process.env.DB_PORT}`);
        console.log(`👤 User: ${process.env.DB_USER}`);
        console.log(`📦 Database: ${process.env.DB_NAME}`);
        
        await sequelize.authenticate();
        console.log('\n✅ Database connection successful!');
        
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Database connection failed!');
        console.error('Error:', error.message);
        console.error('\n⚠️  Please make sure:');
        console.error('  1. PostgreSQL server is running');
        console.error('  2. Credentials in .env are correct');
        console.error('  3. Database exists or can be created');
        
        process.exit(1);
    }
}

testConnection();
