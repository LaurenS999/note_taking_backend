const mysql = require("mysql2");

//Buat Pool (Lebih stabil untuk Railway)
const db = mysql.createPool(process.env.MYSQL_URL);

//CEK KONEKSI
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL gagal konek:", err.message);
  } else {
    console.log("✅ MySQL Connected (via Pool)");
    connection.release();
  }
});
module.exports = db;