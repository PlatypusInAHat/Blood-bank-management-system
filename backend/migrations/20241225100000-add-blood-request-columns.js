'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const { DataTypes } = Sequelize;

        // Thêm các columns mới vào BloodRequest
        try {
            await queryInterface.addColumn('BloodRequest', 'blood_type', {
                type: DataTypes.STRING(10),
                allowNull: true,
            });
        } catch (e) { console.log('blood_type already exists'); }

        try {
            await queryInterface.addColumn('BloodRequest', 'priority', {
                type: DataTypes.ENUM('urgent', 'high', 'normal'),
                defaultValue: 'normal',
            });
        } catch (e) { console.log('priority already exists'); }

        try {
            await queryInterface.addColumn('BloodRequest', 'reason', {
                type: DataTypes.TEXT,
                allowNull: true,
            });
        } catch (e) { console.log('reason already exists'); }

        try {
            await queryInterface.addColumn('BloodRequest', 'reject_reason', {
                type: DataTypes.TEXT,
                allowNull: true,
            });
        } catch (e) { console.log('reject_reason already exists'); }

        try {
            await queryInterface.addColumn('BloodRequest', 'requester_name', {
                type: DataTypes.STRING(255),
                allowNull: true,
            });
        } catch (e) { console.log('requester_name already exists'); }

        try {
            await queryInterface.addColumn('BloodRequest', 'approved_by', {
                type: DataTypes.INTEGER,
                allowNull: true,
            });
        } catch (e) { console.log('approved_by already exists'); }

        try {
            await queryInterface.addColumn('BloodRequest', 'rejected_by', {
                type: DataTypes.INTEGER,
                allowNull: true,
            });
        } catch (e) { console.log('rejected_by already exists'); }

        // Thêm giá trị mới vào enum status trong PostgreSQL
        try {
            await queryInterface.sequelize.query(`
        ALTER TYPE "enum_BloodRequest_status" ADD VALUE IF NOT EXISTS 'delivering';
      `);
        } catch (e) { console.log('delivering already in enum'); }

        try {
            await queryInterface.sequelize.query(`
        ALTER TYPE "enum_BloodRequest_status" ADD VALUE IF NOT EXISTS 'completed';
      `);
        } catch (e) { console.log('completed already in enum'); }

        console.log('✅ Đã thêm các columns mới vào BloodRequest!');
    },

    async down(queryInterface, Sequelize) {
        try { await queryInterface.removeColumn('BloodRequest', 'blood_type'); } catch (e) { }
        try { await queryInterface.removeColumn('BloodRequest', 'priority'); } catch (e) { }
        try { await queryInterface.removeColumn('BloodRequest', 'reason'); } catch (e) { }
        try { await queryInterface.removeColumn('BloodRequest', 'reject_reason'); } catch (e) { }
        try { await queryInterface.removeColumn('BloodRequest', 'requester_name'); } catch (e) { }
        try { await queryInterface.removeColumn('BloodRequest', 'approved_by'); } catch (e) { }
        try { await queryInterface.removeColumn('BloodRequest', 'rejected_by'); } catch (e) { }
    }
};
