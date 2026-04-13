import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registrar(req, res) {
  const { nome, email, senha, academia_nome } = req.body;

  try {
    // cria academia
    const academia = await pool.query(
      'INSERT INTO academias (nome) VALUES ($1) RETURNING *',
      [academia_nome]
    );

    const academia_id = academia.rows[0].id;

    // hash senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // cria usuário
    const user = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, academia_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, email, senhaHash, academia_id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;
console.log('EMAIL RECEBIDO:', email);
  try {
    const user = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0)
      return res.status(400).json({ error: 'Usuário não encontrado' });

    const usuario = user.rows[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida)
      return res.status(400).json({ error: 'Senha inválida' });

    const token = jwt.sign(
      {
        userId: usuario.id,
        academia_id: usuario.academia_id
      },
      'segredo',
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
}
