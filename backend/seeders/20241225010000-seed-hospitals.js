'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Hospital', [
            {
                name: 'Bệnh viện Bạch Mai',
                address: '78 Giải Phóng, Đống Đa, Hà Nội',
                contact_number: '024 3869 3731',
                email: 'bachmai@hospital.vn',
                website: 'https://bachmai.gov.vn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bệnh viện Việt Đức',
                address: '40 Tràng Thi, Hoàn Kiếm, Hà Nội',
                contact_number: '024 3825 3531',
                email: 'vietduc@hospital.vn',
                website: 'https://vietduchospital.edu.vn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bệnh viện 108',
                address: '1 Trần Hưng Đạo, Hai Bà Trưng, Hà Nội',
                contact_number: '024 6278 6789',
                email: '108@hospital.vn',
                website: 'https://benhvien108.vn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bệnh viện Nhi Trung ương',
                address: '18/879 La Thành, Đống Đa, Hà Nội',
                contact_number: '024 6273 8531',
                email: 'nhitw@hospital.vn',
                website: 'https://benhviennhi.org.vn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bệnh viện Chợ Rẫy',
                address: '201B Nguyễn Chí Thanh, Quận 5, TP.HCM',
                contact_number: '028 3855 4137',
                email: 'choray@hospital.vn',
                website: 'https://choray.vn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bệnh viện K',
                address: '43 Quán Sứ, Hoàn Kiếm, Hà Nội',
                contact_number: '024 3825 2484',
                email: 'bvk@hospital.vn',
                website: 'https://benhvienk.vn',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Hospital', null, {});
    }
};
