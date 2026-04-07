require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

//Connect ke Frontend
app.use(cors({
    origin: "https://lauren-note-taking-app.netlify.app/"
}));

//Middleware
app.use(express.json());

//Register routes for CRUD operations
const notesRoutes = require('./routes/notes');
app.use('/notes', notesRoutes);
const categoriesRoutes = require('./routes/categories');
app.use('/categories', categoriesRoutes);

//Menjalankan server di Node.js
const PORT = process.env.DB_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});