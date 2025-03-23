const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; 

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token.' });
    }
    req.user = decoded; 
    next();
  });
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied.' });
    }
    next();
  };
};
