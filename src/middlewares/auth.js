import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, 'segredo');

    req.user = decoded; 
    // { userId, academia_id }

    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}