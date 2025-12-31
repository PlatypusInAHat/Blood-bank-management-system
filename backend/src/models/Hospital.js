const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Hospital = sequelize.define("Hospital", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true // Tự động tăng cho mỗi bệnh viện
        },
        name: { // Tên bệnh viện
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: { // Địa chỉ bệnh viện
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
        website: { // Website của bệnh viện
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    });

    return Hospital;
};
