const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua Categories
router.get('/', (req, res) => {
  const keyword = req.query.search;

  let sql = 'SELECT * FROM categories';
  let values = [];

  if (keyword) {
    sql += ` WHERE name LIKE ?`;
    values.push(`%${keyword}%`, `%${keyword}%`);
  }

  db.query(sql, values, (err, result) => {
    if(err)
    {
      return res.status(500).json({error: "Kategori tidak ditemukan"})
    }
    res.json(result);
    
  });
});

//Create Categories
router.post('/', (req, res) => {
  const { name, code_color } = req.body;

  db.query(
    'INSERT INTO categories (name, code_color) VALUES (?, ?)',
    [name, code_color],
    (err, result) => {
      if (err)
      {
        return res.status(500).json({ error: err.message });
      }
        res.json({ message: 'Kategori berhasil dibuat', id:result.insertId });
    }
  );
});

//Edit Categories
router.put('/:id', (req, res) => {
  const { name, code_color } = req.body;

  db.query(
    'UPDATE categories SET name=?, code_color=?, updated_at=? WHERE id=?',
    [name, code_color, Date.now(), req.params.id],
    (err, result) => {
      if (err) 
        {
          return res.status(500).json({ error: err.message });
        }
      if (result.affectedRows === 0)
      {
        return res.status(404).json({erro: 'Kategori tidak ditemukan'});
      }
      res.json({ message: 'Kategori berhasil dibuat', id:req.params.id});
    }
  );
});


//Delete Categories
router.delete('/:id', (req, res) => {
  //Cek Apakah ada notes yang masih menggunakan kategori.
  const [notes] = db.query('SELECT * FROM notes WHERE category_id = ?', [id]);
  if (notes.length > 0) {
    return res.status(400).json({ 
      message: "Gagal menghapus! Kategori ini masih memiliki catatan (notes) yang terhubung." 
    });
  }


  db.query(
    'DELETE FROM categories WHERE id=?',
    [req.params.id],
    (err,result) => {
      if (err) 
      {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0)
      {
        return res.status(404).json({erro: 'Kategori tidak ditemukan'});
      }
      res.json({ message: 'Kategori behasil dihapus', id:req.params.id});
    }
  );
});

module.exports = router;