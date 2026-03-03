const { issueToken } = require('../config/auth');

const login = (req, res) => {
  const { username, password } = req.body || {};

  // Mock admin credentials for assignment testing (Postman + SPA)
  if (username === 'admin' && password === 'password123') {
    const token = issueToken({ username: 'admin', role: 'admin' });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { login };
