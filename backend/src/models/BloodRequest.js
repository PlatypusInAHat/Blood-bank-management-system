const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const BloodRequest = sequelize.define("BloodRequest", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hospital_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        bloodInventoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "BloodInventory",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        blood_type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        priority: {
            type: DataTypes.ENUM("urgent", "high", "normal"),
            defaultValue: "normal",
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected", "delivering", "completed"),
            defaultValue: "pending",
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        reject_reason: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        requester_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        approved_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        rejected_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "User",
                key: "id",
            },
        },
        donorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Donor",
                key: "id",
            },
        },
        hospital_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Hospital",
                key: "id",
            },
        },
    });
    return BloodRequest;
};