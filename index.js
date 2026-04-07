require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

//Connect ke Frontend
app.use(cors({
  origin: "http://localhost:3000"
}));

//Middleware
app.use(express.json());

//Menjalankan server di Node.js
const PORT = process.env.DB_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});