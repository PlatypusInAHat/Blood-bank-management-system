
const dotenv = require("dotenv");
const { syncDatabase } = require("./src/models"); // Đồng bộ hóa database trước khi chạy server

dotenv.config();  // Đọc các biến môi trường từ .env

const app = require("./src/app"); // Import ứng dụng Express đã cấu hình API

const PORT = process.env.PORT || 5000;  // Lấy port từ biến môi trường hoặc mặc định 5000

// Kết nối database và khởi động server
syncDatabase()
  .then(() => {
    // Nếu kết nối database thành công, khởi động server
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    // Nếu có lỗi trong khi đồng bộ hóa database, ghi lỗi vào console
    console.error("❌ Lỗi khi khởi động server:", error);
    process.exit(1);
  });
