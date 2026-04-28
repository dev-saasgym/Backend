import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;

    // ✔ garante que o header existe
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // ✔ garante formato correto
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const token = authHeader.split(' ')[1];

    // ✔ valida existência
    if (!token) {
      return res.status(401).json({ error: 'Token ausente' });
    }

    const decoded = jwt.verify(token, 'segredo');

    req.user = decoded;

    next();
  } catch (err) {
    console.error('ERRO AUTH:', err);
    return res.status(401).json({ error: 'Token inválido' });
  }
}
