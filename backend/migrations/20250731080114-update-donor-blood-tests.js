'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cập nhật bảng Donor để thêm trường donation_location_id
    try {
      await queryInterface.addColumn('Donor', 'donation_location_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'BloodDonationLocation', // Bảng BloodDonationLocation (số ít)
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    } catch (e) { console.log('Donor.donation_location_id already exists or BloodDonationLocation not ready'); }

    // Cập nhật bảng BloodTest để thêm các trường mới
    try {
      await queryInterface.addColumn('BloodTest', 'donation_location_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'BloodDonationLocation', // Bảng BloodDonationLocation (số ít)
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    } catch (e) { console.log('BloodTest.donation_location_id already exists'); }

    // Thêm cột bloodInventoryId vào bảng BloodTest
    try {
      await queryInterface.addColumn('BloodTest', 'bloodInventoryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'BloodInventory', // Bảng BloodInventory (số ít)
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    } catch (e) { console.log('BloodTest.bloodInventoryId already exists'); }

    // Thêm cột donorId vào bảng BloodTest
    try {
      await queryInterface.addColumn('BloodTest', 'donorId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Donor', // Bảng Donor (số ít)
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    } catch (e) { console.log('BloodTest.donorId already exists'); }

    // Tạo trường history trong bảng Donor (nếu chưa có)
    try {
      await queryInterface.addColumn('Donor', 'history', {
        type: Sequelize.JSON,
        allowNull: true,
      });
    } catch (e) { console.log('Donor.history already exists'); }

    console.log('✅ Migration completed!');
  },

  down: async (queryInterface, Sequelize) => {
    // Hoàn tác thay đổi, xóa các cột đã thêm
    try { await queryInterface.removeColumn('Donor', 'donation_location_id'); } catch (e) { }
    try { await queryInterface.removeColumn('BloodTest', 'donation_location_id'); } catch (e) { }
    try { await queryInterface.removeColumn('BloodTest', 'bloodInventoryId'); } catch (e) { }
    try { await queryInterface.removeColumn('BloodTest', 'donorId'); } catch (e) { }
    try { await queryInterface.removeColumn('Donor', 'history'); } catch (e) { }
  },
};
