import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admins only' });
    }

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token', details: err.message });
  }
};

export default adminMiddleware;
