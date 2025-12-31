'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);

        // Lấy IDs từ database
        const hospitals = await queryInterface.sequelize.query(
            'SELECT id FROM "Hospital" ORDER BY id LIMIT 6',
            { type: Sequelize.QueryTypes.SELECT }
        );
        const users = await queryInterface.sequelize.query(
            'SELECT id FROM "User" ORDER BY id LIMIT 7',
            { type: Sequelize.QueryTypes.SELECT }
        );
        const inventories = await queryInterface.sequelize.query(
            'SELECT id FROM "BloodInventory" ORDER BY id LIMIT 8',
            { type: Sequelize.QueryTypes.SELECT }
        );

        if (hospitals.length < 6 || users.length < 5 || inventories.length < 8) {
            console.log('⚠️ Cần chạy các seeder trước đó!');
            return;
        }

        await queryInterface.bulkInsert('BloodRequest', [
            {
                hospital_name: 'Bệnh viện Bạch Mai',
                blood_type: 'O+',
                quantity: 5,
                priority: 'urgent',
                status: 'pending',
                reason: 'Phẫu thuật cấp cứu tim mạch',
                requester_name: 'BS. Nguyễn Văn A',
                bloodInventoryId: inventories[0].id,
                userId: users[1].id,
                hospital_id: hospitals[0].id,
                createdAt: today,
                updatedAt: today
            },
            {
                hospital_name: 'Bệnh viện Việt Đức',
                blood_type: 'AB-',
                quantity: 3,
                priority: 'high',
                status: 'pending',
                reason: 'Ca phẫu thuật chấn thương',
                requester_name: 'BS. Trần Thị B',
                bloodInventoryId: inventories[7].id,
                userId: users[2].id,
                hospital_id: hospitals[1].id,
                createdAt: today,
                updatedAt: today
            },
            {
                hospital_name: 'Bệnh viện 108',
                blood_type: 'A+',
                quantity: 2,
                priority: 'normal',
                status: 'approved',
                reason: 'Điều trị bệnh nhân ung thư',
                requester_name: 'BS. Lê Văn C',
                bloodInventoryId: inventories[1].id,
                userId: users[3].id,
                hospital_id: hospitals[2].id,
                approved_by: users[0].id,
                createdAt: yesterday,
                updatedAt: yesterday
            },
            {
                hospital_name: 'Bệnh viện Nhi Trung ương',
                blood_type: 'B+',
                quantity: 4,
                priority: 'urgent',
                status: 'delivering',
                reason: 'Bệnh nhân nhi cấp cứu',
                requester_name: 'BS. Phạm Thị D',
                bloodInventoryId: inventories[2].id,
                userId: users[4].id,
                hospital_id: hospitals[3].id,
                approved_by: users[0].id,
                createdAt: yesterday,
                updatedAt: yesterday
            },
            {
                hospital_name: 'Bệnh viện Chợ Rẫy',
                blood_type: 'O-',
                quantity: 6,
                priority: 'high',
                status: 'rejected',
                reason: 'Phẫu thuật ghép tạng',
                reject_reason: 'Không đủ thông tin bệnh nhân',
                requester_name: 'BS. Hoàng Văn E',
                bloodInventoryId: inventories[4].id,
                userId: users[1].id,
                hospital_id: hospitals[4].id,
                rejected_by: users[0].id,
                createdAt: twoDaysAgo,
                updatedAt: twoDaysAgo
            },
            {
                hospital_name: 'Bệnh viện K',
                blood_type: 'A-',
                quantity: 3,
                priority: 'normal',
                status: 'completed',
                reason: 'Điều trị hóa chất định kỳ',
                requester_name: 'BS. Vũ Thị F',
                bloodInventoryId: inventories[5].id,
                userId: users[2].id,
                hospital_id: hospitals[5].id,
                approved_by: users[0].id,
                createdAt: twoDaysAgo,
                updatedAt: twoDaysAgo
            },
            {
                hospital_name: 'Bệnh viện Bạch Mai',
                blood_type: 'B-',
                quantity: 2,
                priority: 'high',
                status: 'pending',
                reason: 'Cấp cứu tai nạn giao thông',
                requester_name: 'BS. Nguyễn Văn A',
                bloodInventoryId: inventories[6].id,
                userId: users[1].id,
                hospital_id: hospitals[0].id,
                createdAt: today,
                updatedAt: today
            },
            {
                hospital_name: 'Bệnh viện Việt Đức',
                blood_type: 'AB+',
                quantity: 1,
                priority: 'normal',
                status: 'pending',
                reason: 'Phẫu thuật định kỳ',
                requester_name: 'BS. Trần Thị B',
                bloodInventoryId: inventories[3].id,
                userId: users[2].id,
                hospital_id: hospitals[1].id,
                createdAt: today,
                updatedAt: today
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('BloodRequest', null, {});
    }
};
