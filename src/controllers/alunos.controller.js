import pool from '../config/db.js';

// ✅ CRIAR ALUNO
export async function criarAluno(req, res) {
  const { nome, telefone } = req.body;
  const { academia_id } = req.user;

  try {
    const result = await pool.query(
      `
      INSERT INTO alunos (
        nome,
        telefone,
        academia_id,
        status_id
      )
      VALUES ($1, $2, $3, 1)
      RETURNING *
      `,
      [nome, telefone, academia_id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
}

// ✅ LISTAR ALUNOS
export async function listarAlunos(req, res) {
  const { academia_id } = req.user;

  try {
    const result = await pool.query(
      `
      SELECT
        alunos.*,
        status_alunos.nome AS status
      FROM alunos
      LEFT JOIN status_alunos
        ON alunos.status_id = status_alunos.id
      WHERE alunos.academia_id = $1
      ORDER BY alunos.id DESC
      `,
      [academia_id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
}
