const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodTest = sequelize.define("BloodTest", {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        donorId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: "Donor", // Tham chiếu đến mô hình Donor
                key: "id", // Khóa chính của Donor
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        bloodInventoryId: { // Thêm khóa ngoại để tham chiếu đến BloodInventory
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "BloodInventory", // Tham chiếu đến mô hình BloodInventory
                key: "id", // Khóa chính của BloodInventory
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        test_date: { 
            type: DataTypes.DATE, 
            allowNull: false 
        },
        hiv: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        hepatitis_b: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        hepatitis_c: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        syphilis: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        malaria: { 
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false 
        },
        status: { 
            type: DataTypes.ENUM("pending", "passed", "failed"), 
            defaultValue: "pending" 
        }
    });



    return BloodTest;
};
