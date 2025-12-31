'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Donor', [
            {
                name: 'Nguyễn Văn Minh',
                age: 28,
                gender: 'male',
                blood_type: 'O+',
                last_donation: new Date('2024-11-15'),
                history: JSON.stringify([{ date: '2024-11-15', location: 'BV Bạch Mai' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Trần Thị Hương',
                age: 32,
                gender: 'female',
                blood_type: 'A+',
                last_donation: new Date('2024-10-20'),
                history: JSON.stringify([{ date: '2024-10-20', location: 'BV Việt Đức' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Lê Văn Hùng',
                age: 25,
                gender: 'male',
                blood_type: 'B+',
                last_donation: new Date('2024-12-01'),
                history: JSON.stringify([{ date: '2024-12-01', location: 'BV 108' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Phạm Thị Mai',
                age: 29,
                gender: 'female',
                blood_type: 'AB+',
                last_donation: new Date('2024-09-10'),
                history: JSON.stringify([{ date: '2024-09-10', location: 'BV Nhi TW' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hoàng Văn Đức',
                age: 35,
                gender: 'male',
                blood_type: 'O-',
                last_donation: new Date('2024-08-25'),
                history: JSON.stringify([{ date: '2024-08-25', location: 'BV Chợ Rẫy' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Vũ Thị Lan',
                age: 27,
                gender: 'female',
                blood_type: 'A-',
                last_donation: new Date('2024-11-30'),
                history: JSON.stringify([{ date: '2024-11-30', location: 'BV K' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đỗ Văn Tùng',
                age: 31,
                gender: 'male',
                blood_type: 'B-',
                last_donation: new Date('2024-07-15'),
                history: JSON.stringify([{ date: '2024-07-15', location: 'BV Bạch Mai' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bùi Thị Hồng',
                age: 24,
                gender: 'female',
                blood_type: 'AB-',
                last_donation: new Date('2024-12-10'),
                history: JSON.stringify([{ date: '2024-12-10', location: 'BV Việt Đức' }]),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Donor', null, {});
    }
};
