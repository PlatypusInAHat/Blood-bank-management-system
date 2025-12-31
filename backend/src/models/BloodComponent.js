const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodComponent = sequelize.define("BloodComponent", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true // Tự động tăng cho mỗi chế phẩm
        },
        bloodInventoryId: { // Khóa ngoại tham chiếu đến BloodInventory
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "BloodInventory", // Tham chiếu đến mô hình BloodInventory
                key: "id", // Khóa chính của BloodInventory
            },
            onDelete: "CASCADE", // Xóa chế phẩm nếu đơn vị máu bị xóa
            onUpdate: "CASCADE", // Cập nhật chế phẩm nếu đơn vị máu được cập nhật
        },
        component_type: { // Loại chế phẩm máu (hồng cầu, tiểu cầu, huyết tương, v.v.)
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        quantity: { // Số lượng chế phẩm (kiểu INTEGER)
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // Mặc định là 0 nếu không có số lượng cụ thể
        },
        expiry_date: { // Ngày hết hạn của chế phẩm
            type: DataTypes.DATE,
            allowNull: false,
        }
    });


    return BloodComponent;
};
