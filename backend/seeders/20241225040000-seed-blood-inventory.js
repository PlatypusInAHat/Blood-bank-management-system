'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const today = new Date();
        const expiry30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expiry45Days = new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000);
        const expiry21Days = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);

        // Lấy donor IDs từ database
        const donors = await queryInterface.sequelize.query(
            'SELECT id FROM "Donor" ORDER BY id LIMIT 8',
            { type: Sequelize.QueryTypes.SELECT }
        );

        if (donors.length < 8) {
            console.log('⚠️ Cần chạy seed-donors.js trước!');
            return;
        }

        await queryInterface.bulkInsert('BloodInventory', [
            {
                blood_type: 'O+',
                quantity: 50,
                expiry_date: expiry30Days,
                donorId: donors[0].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'A+',
                quantity: 35,
                expiry_date: expiry45Days,
                donorId: donors[1].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'B+',
                quantity: 28,
                expiry_date: expiry30Days,
                donorId: donors[2].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'AB+',
                quantity: 15,
                expiry_date: expiry21Days,
                donorId: donors[3].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'O-',
                quantity: 20,
                expiry_date: expiry45Days,
                donorId: donors[4].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'A-',
                quantity: 12,
                expiry_date: expiry30Days,
                donorId: donors[5].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'B-',
                quantity: 8,
                expiry_date: expiry21Days,
                donorId: donors[6].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                blood_type: 'AB-',
                quantity: 5,
                expiry_date: expiry45Days,
                donorId: donors[7].id,
                donation_location_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('BloodInventory', null, {});
    }
};
