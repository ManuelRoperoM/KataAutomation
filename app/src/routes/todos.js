const { Router } = require('express');
const { pool } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, completed, created_at FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ detail: 'Error interno' });
  }
});

router.post('/', async (req, res) => {
  const { title, completed } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ detail: 'El título es requerido' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO todos (title, completed, user_id) VALUES ($1, $2, $3) RETURNING id, title, completed, created_at',
      [title.trim(), completed || false, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ detail: 'Error interno' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      'UPDATE todos SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 AND user_id = $4 RETURNING id, title, completed, created_at',
      [title, completed, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ detail: 'Tarea no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ detail: 'Error interno' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ detail: 'Tarea no encontrada' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ detail: 'Error interno' });
  }
});

module.exports = router;
