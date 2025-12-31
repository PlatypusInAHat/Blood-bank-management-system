'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('123456', 10);

        await queryInterface.bulkInsert('User', [
            {
                name: 'Admin BloodBank',
                email: 'admin@bloodbank.vn',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'BS. Nguyễn Văn A',
                email: 'nguyenvana@bachmai.vn',
                password: hashedPassword,
                role: 'hospital',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'BS. Trần Thị B',
                email: 'tranthib@vietduc.vn',
                password: hashedPassword,
                role: 'hospital',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'BS. Lê Văn C',
                email: 'levanc@108.vn',
                password: hashedPassword,
                role: 'hospital',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'BS. Phạm Thị D',
                email: 'phamthid@nhitw.vn',
                password: hashedPassword,
                role: 'hospital',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Nguyễn Donor 1',
                email: 'donor1@gmail.com',
                password: hashedPassword,
                role: 'donor',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Donor 2',
                email: 'donor2@gmail.com',
                password: hashedPassword,
                role: 'donor',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('User', null, {});
    }
};
