const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kata-secret-key';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : req.cookies?.token;

  if (!token) {
    return res.status(401).json({ detail: 'No autorizado' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ detail: 'Token inválido' });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
