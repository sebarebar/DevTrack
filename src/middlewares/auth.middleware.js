const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const encabezado = req.headers.authorization;
  if (!encabezado) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = encabezado.split(' ')[1];
  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.user = datos;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido' });
  }
}

module.exports = authMiddleware;
