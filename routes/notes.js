const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua catatan
router.get('/', (req, res) => {
  const keyword = req.query.search;

  let sql = 'SELECT * FROM notes';
  let values = [];

  if (keyword) {
    sql += ` WHERE title LIKE ? OR content LIKE ?`;
    values.push(`%${keyword}%`, `%${keyword}%`);
  }

  sql += ' ORDER BY updated_at DESC';

  db.query(sql, values, (err, result) => {
    if(err)
    {
      return res.status(500).json({error: "Catatan tidak ditemukan"})
    }
    res.json(result);
    
  });
});

//Create catatan
router.post('/', (req, res) => {
  const { title, content, category_id } = req.body;

  db.query(
    'INSERT INTO notes (title, content, categories_id) VALUES (?, ?, ?)',
    [title, content, category_id],
    (err, result) => {
      if (err)
      {
        return res.status(500).json({error: "Catatan gagal ditambahkan"})
      }
      res.json({ message: 'Note created', id:result.insertId });
    }
  );
});

//Edit Catatan
router.put('/:id', (req, res) => {
  const { title, content,category_id } = req.body;

  db.query(
    'UPDATE notes SET title=?, content=?, updated_at=NOW(), categories_id=? WHERE id=?',
    [title, content, category_id ,req.params.id],
    (err, result) => {
      if (err) 
        {
          return res.status(500).json({ error: err.message });
        }
      if (result.affectedRows === 0)
      {
        return res.status(404).json({erro: 'Note no found'});
      }
      res.json({ message: 'Note updated', id:req.params.id});
    }
  );
});


//Delete catatan
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM notes WHERE id=?',
    [req.params.id],
    (err,result) => {
      if (err) 
      {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0)
      {
        return res.status(404).json({erro: 'Note no found'});
      }
      res.json({ message: 'Note deleted', id:req.params.id});
    }
  );
});

module.exports = router;