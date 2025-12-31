const { Sequelize } = require('sequelize');
require('dotenv').config();

// Tạo đối tượng Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Lấy tên cơ sở dữ liệu từ .env
    process.env.DB_USER,      // Lấy tên người dùng từ .env
    process.env.DB_PASSWORD,  // Lấy mật khẩu từ .env
    {
        host: process.env.DB_HOST,  // Lấy host từ .env
        dialect: 'postgres',        // Sử dụng PostgreSQL
        port: process.env.DB_PORT,  // Lấy cổng từ .env
        logging: false,             // Tắt log SQL nếu không cần
        define: {
            freezeTableName: true, // Ngăn Sequelize tự động đổi tên bảng thành số nhiều
            timestamps: true,       // Tự động thêm createdAt và updatedAt vào tất cả các bảng
        },
    }
);

// Load Models
const User = require('./User')(sequelize);
const Donor = require('./Donor')(sequelize);
const BloodInventory = require('./BloodInventory')(sequelize);
const BloodRequest = require('./BloodRequest')(sequelize);
const BloodTest = require('./BloodTest')(sequelize); // Thêm model BloodTest
const BloodDonationLocation = require('./BloodDonationLocation')(sequelize); // Thêm model BloodDonationLocation
const BloodComponent = require('./BloodComponent')(sequelize); // Thêm model BloodComponent
const Hospital = require('./Hospital')(sequelize); // Thêm model Hospital

// 📌 Thiết lập quan hệ giữa các bảng

// 1️⃣ User ↔ BloodRequest (Một user có thể tạo nhiều yêu cầu máu)
User.hasMany(BloodRequest, { foreignKey: 'userId', onDelete: 'CASCADE' });
BloodRequest.belongsTo(User, { foreignKey: 'userId' });

// 2️⃣ Donor ↔ BloodRequest (Một người hiến máu có thể hiến nhiều lần)
Donor.hasMany(BloodRequest, { foreignKey: 'donorId', onDelete: 'CASCADE' });
BloodRequest.belongsTo(Donor, { foreignKey: 'donorId' });

// 3️⃣ Donor ↔ BloodTest (Mỗi người hiến máu có thể có nhiều xét nghiệm máu)
Donor.hasMany(BloodTest, { foreignKey: 'donorId', onDelete: 'CASCADE' });
BloodTest.belongsTo(Donor, { foreignKey: 'donorId' });

// 4️⃣ BloodRequest ↔ BloodInventory (Mỗi yêu cầu máu liên kết với kho máu)
BloodInventory.hasMany(BloodRequest, { foreignKey: 'bloodInventoryId', onDelete: 'CASCADE' });
BloodRequest.belongsTo(BloodInventory, { foreignKey: 'bloodInventoryId' });

// 5️⃣ BloodInventory ↔ BloodDonationLocation (Mỗi đơn vị máu có thể liên kết với một địa điểm hiến máu)
BloodInventory.belongsTo(BloodDonationLocation, {
    foreignKey: 'donation_location_id', // Liên kết với trường donation_location_id
    as: 'donationLocation',             // Tên để truy cập quan hệ trong mô hình
});

// 6️⃣ BloodComponent ↔ BloodInventory (Mỗi chế phẩm máu có thể liên kết với một đơn vị máu)
BloodComponent.belongsTo(BloodInventory, {
    foreignKey: 'bloodInventoryId',     // Liên kết với trường bloodInventoryId
    as: 'bloodInventory',               // Tên để truy cập quan hệ trong mô hình
});

// 7️⃣ BloodRequest ↔ Hospital (Mỗi yêu cầu máu có thể thuộc về một bệnh viện)
Hospital.hasMany(BloodRequest, { foreignKey: 'hospital_id', onDelete: 'CASCADE' });
BloodRequest.belongsTo(Hospital, { foreignKey: 'hospital_id' });

// 🔄 Đồng bộ database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Tự động cập nhật database khi có thay đổi
        console.log('✅ Database đã được đồng bộ!');
    } catch (error) {
        console.error('❌ Lỗi đồng bộ database:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Donor,
    BloodInventory,
    BloodRequest,
    BloodTest,
    BloodDonationLocation,
    BloodComponent,
    Hospital,
    syncDatabase,
};
