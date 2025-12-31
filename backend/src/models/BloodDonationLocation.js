const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodDonationLocation = sequelize.define("BloodDonationLocation", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true // Tự động tăng cho mỗi địa điểm
        },
        name: { // Tên địa điểm hiến máu
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: { // Địa chỉ của địa điểm hiến máu
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contact_number: { // Số điện thoại liên hệ
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        email: { // Email liên hệ
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        opening_hours: { // Giờ hoạt động của địa điểm hiến máu
            type: DataTypes.STRING(100),
            allowNull: true,
        },
         has_platelet_donation: { // Cột để xác định địa điểm có hiến tiểu cầu hay không
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    });

    return BloodDonationLocation;
};
