'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Xóa toàn bộ dữ liệu cũ theo thứ tự (do foreign key constraints)
        await queryInterface.bulkDelete('BloodRequest', null, {});
        await queryInterface.bulkDelete('BloodInventory', null, {});
        await queryInterface.bulkDelete('BloodTest', null, {});
        await queryInterface.bulkDelete('Donor', null, {});
        await queryInterface.bulkDelete('User', null, {});
        await queryInterface.bulkDelete('Hospital', null, {});

        // Reset sequences (auto-increment) trong PostgreSQL
        await queryInterface.sequelize.query('ALTER SEQUENCE IF EXISTS "BloodRequest_id_seq" RESTART WITH 1;');
        await queryInterface.sequelize.query('ALTER SEQUENCE IF EXISTS "BloodInventory_id_seq" RESTART WITH 1;');
        await queryInterface.sequelize.query('ALTER SEQUENCE IF EXISTS "BloodTest_id_seq" RESTART WITH 1;');
        await queryInterface.sequelize.query('ALTER SEQUENCE IF EXISTS "Donor_id_seq" RESTART WITH 1;');
        await queryInterface.sequelize.query('ALTER SEQUENCE IF EXISTS "User_id_seq" RESTART WITH 1;');
        await queryInterface.sequelize.query('ALTER SEQUENCE IF EXISTS "Hospital_id_seq" RESTART WITH 1;');

        console.log('✅ Đã xóa toàn bộ dữ liệu cũ và reset ID sequences!');
    },

    async down(queryInterface, Sequelize) {
        // Không làm gì khi undo vì đây là seeder xóa dữ liệu
        console.log('⚠️ Không thể hoàn tác việc xóa dữ liệu');
    }
};
