const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'travlr-module7-secret-change-me';

const issueToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.substring(7);
  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { issueToken, verifyJWT };
