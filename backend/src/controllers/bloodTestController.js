const { BloodTest, BloodInventory, Donor, BloodDonationLocation } = require("../models");

// Lấy tất cả các xét nghiệm máu
exports.getAllTests = async(req, res) => {
    try {
        const tests = await BloodTest.findAll({
            include: [
                {
                    model: Donor,
                    as: "donor",
                    attributes: ["name", "blood_type"], // Thông tin người hiến máu
                },
                {
                    model: BloodInventory,
                    as: "bloodInventory",
                    attributes: ["id", "blood_type", "quantity"], // Thông tin kho máu
                },
                {
                    model: BloodDonationLocation,
                    as: "donationLocation",
                    attributes: ["name", "address"], // Thông tin địa điểm hiến máu
                }
            ]
        });
        res.status(200).json({ success: true, data: tests });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Lấy xét nghiệm máu theo ID
exports.getTestById = async(req, res) => {
    try {
        const test = await BloodTest.findByPk(req.params.id, {
            include: [
                {
                    model: Donor,
                    as: "donor",
                    attributes: ["name", "blood_type"], // Thông tin người hiến máu
                },
                {
                    model: BloodInventory,
                    as: "bloodInventory",
                    attributes: ["id", "blood_type", "quantity"], // Thông tin kho máu
                },
                {
                    model: BloodDonationLocation,
                    as: "donationLocation",
                    attributes: ["name", "address"], // Thông tin địa điểm hiến máu
                }
            ]
        });

        if (!test) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xét nghiệm máu!" });
        }
        res.status(200).json({ success: true, data: test });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Thêm xét nghiệm máu mới
exports.createTest = async(req, res) => {
    try {
        const { donorId, bloodInventoryId, donation_location_id, test_date, hiv, hepatitis_b, hepatitis_c, syphilis, malaria, status } = req.body;

        const newTest = await BloodTest.create({
            donorId,
            bloodInventoryId,
            donation_location_id,
            test_date,
            hiv,
            hepatitis_b,
            hepatitis_c,
            syphilis,
            malaria,
            status
        });

        res.status(201).json({ success: true, data: newTest });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Cập nhật xét nghiệm máu
exports.updateTest = async(req, res) => {
    try {
        const test = await BloodTest.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xét nghiệm máu!" });
        }

        const { donorId, bloodInventoryId, donation_location_id, test_date, hiv, hepatitis_b, hepatitis_c, syphilis, malaria, status } = req.body;

        // Cập nhật thông tin xét nghiệm máu
        await test.update({
            donorId,
            bloodInventoryId,
            donation_location_id,
            test_date,
            hiv,
            hepatitis_b,
            hepatitis_c,
            syphilis,
            malaria,
            status
        });

        res.status(200).json({ success: true, message: "Cập nhật thành công!", data: test });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};

// Xóa xét nghiệm máu
exports.deleteTest = async(req, res) => {
    try {
        const test = await BloodTest.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: "Không tìm thấy xét nghiệm máu!" });
        }

        await test.destroy();
        res.status(200).json({ success: true, message: "Xóa thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!", error });
    }
};
