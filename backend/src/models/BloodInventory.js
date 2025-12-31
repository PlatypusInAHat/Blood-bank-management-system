const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodInventory = sequelize.define("BloodInventory", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true // Tự động tăng cho mỗi đơn vị máu
        },
        blood_type: {
            type: DataTypes.STRING(5),
            allowNull: false,

        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        expiry_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        donorId: { // Khóa ngoại tham chiếu đến Donor
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Donor", // Tham chiếu đến mô hình Donor
                key: "id", // Khóa chính của Donor
            },
            onDelete: "CASCADE", // Xóa đơn vị máu nếu người hiến máu bị xóa
            onUpdate: "CASCADE", // Cập nhật thông tin đơn vị máu nếu người hiến máu được cập nhật
        },
        donation_location_id: { // Khóa ngoại tham chiếu đến BloodDonationLocation
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "BloodDonationLocation", // Tham chiếu đến mô hình BloodDonationLocation
                key: "id",
            },
            onDelete: "CASCADE", // Xóa đơn vị máu nếu địa điểm hiến máu bị xóa
            onUpdate: "CASCADE", // Cập nhật thông tin đơn vị máu nếu địa điểm hiến máu được cập nhật
        }
    });

  

    return BloodInventory;
};
