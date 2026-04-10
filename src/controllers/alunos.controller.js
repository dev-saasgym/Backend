import pool from '../config/db.js';

export async function criarAluno(req, res) {
  const { nome, telefone } = req.body;
  const { academia_id } = req.user;

  try {
    const result = await pool.query(
      `INSERT INTO alunos (nome, telefone, academia_id, status_id)
       VALUES ($1, $2, $3, 1) RETURNING *`,
      [nome, telefone, academia_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export async function listarAlunos(req, res) {
  const { academia_id } = req.user;

  const result = await pool.query(
    'SELECT * FROM alunos WHERE academia_id = $1',
    [academia_id]
  );

  res.json(result.rows);
}
