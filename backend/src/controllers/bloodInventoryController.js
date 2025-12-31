const { BloodInventory } = require("../models");
const { Op } = require("sequelize");

// Lấy danh sách kho máu
exports.getAllBlood = async(req, res) => {
    try {
        const bloodStock = await BloodInventory.findAll();
        res.status(200).json({ success: true, data: bloodStock });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Cập nhật số lượng máu (Nhập thêm vào kho)
exports.updateBloodStock = async(req, res) => {
    try {
        const { blood_type, quantity, expiry_date, donorId, donation_location_id } = req.body;

        // Kiểm tra số lượng máu nhập vào có hợp lệ không
        if (quantity <= 0) {
            return res.status(400).json({ success: false, message: "Số lượng máu phải lớn hơn 0!" });
        }

        // Kiểm tra nếu nhóm máu đã tồn tại trong kho, nếu không thì tạo mới
        let bloodRecord = await BloodInventory.findOne({ where: { blood_type } });

        if (!bloodRecord) {
            // Nếu nhóm máu chưa tồn tại, tạo mới
            bloodRecord = await BloodInventory.create({ 
                blood_type, 
                quantity, 
                expiry_date,
                donorId,
                donation_location_id
            });
        } else {
            // Nếu nhóm máu đã có, cập nhật số lượng
            bloodRecord.quantity += quantity;
            bloodRecord.expiry_date = expiry_date; // Cập nhật hạn sử dụng mới nhất
            bloodRecord.donorId = donorId; // Cập nhật thông tin người hiến
            bloodRecord.donation_location_id = donation_location_id; // Cập nhật địa điểm hiến
            await bloodRecord.save();
        }

        res.status(200).json({ success: true, message: "Cập nhật kho máu thành công", data: bloodRecord });
    } catch (error) {
        console.error("Lỗi khi cập nhật kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Tự động xóa máu hết hạn khỏi kho
exports.removeExpiredBlood = async() => {
    try {
        const today = new Date();
        const expiredBlood = await BloodInventory.destroy({ where: { expiry_date: {
                    [Op.lt]: today } } });

        console.log(`Đã xóa ${expiredBlood} đơn vị máu hết hạn khỏi kho.`);
    } catch (error) {
        console.error("Lỗi khi xóa máu hết hạn:", error);
    }
};

// Kiểm tra kho máu trước khi duyệt yêu cầu
exports.checkBloodAvailability = async(req, res) => {
    try {
        const { blood_type, quantity } = req.body;

        const bloodRecord = await BloodInventory.findOne({ where: { blood_type } });

        if (!bloodRecord || bloodRecord.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Không đủ máu trong kho để duyệt yêu cầu!" });
        }

        res.status(200).json({ success: true, message: "Kho máu đủ để duyệt yêu cầu" });
    } catch (error) {
        console.error("Lỗi khi kiểm tra kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

// Xuất kho máu khi phê duyệt yêu cầu và ưu tiên các đơn vị máu gần hết hạn
exports.deductBloodStock = async(req, res) => {
    try {
        const { blood_type, quantity } = req.body;

        // Lấy các đơn vị máu của loại blood_type và sắp xếp theo ngày hết hạn gần nhất
        const bloodRecords = await BloodInventory.findAll({
            where: { blood_type },
            order: [
                ['expiry_date', 'ASC'], // Sắp xếp theo ngày hết hạn, từ gần nhất
            ]
        });

        let totalDeducted = 0; // Tổng số lượng máu đã xuất kho

        // Duyệt qua các đơn vị máu và trừ dần số lượng
        for (let i = 0; i < bloodRecords.length; i++) {
            const bloodRecord = bloodRecords[i];

            // Nếu số lượng máu trong đơn vị này còn đủ
            if (bloodRecord.quantity >= quantity - totalDeducted) {
                // Trừ số lượng yêu cầu từ đơn vị máu này
                bloodRecord.quantity -= (quantity - totalDeducted);
                await bloodRecord.save();

                totalDeducted = quantity; // Đã trừ đủ số lượng
                break;
            } else {
                // Nếu số lượng không đủ, xuất hết số lượng của đơn vị này và chuyển sang đơn vị tiếp theo
                totalDeducted += bloodRecord.quantity;
                bloodRecord.quantity = 0; // Đã xuất hết
                await bloodRecord.save();
            }
        }

        // Kiểm tra nếu chưa đủ số lượng máu xuất kho
        if (totalDeducted < quantity) {
            return res.status(400).json({ success: false, message: "Không đủ máu để xuất kho!" });
        }

        res.status(200).json({ success: true, message: "Xuất kho thành công", data: totalDeducted });
    } catch (error) {
        console.error("Lỗi khi xuất kho máu:", error);
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};
