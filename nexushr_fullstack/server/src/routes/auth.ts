import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// Simple in-memory users for demo
const users = [
  { id: '1', email: 'manager@example.com', password: 'password', role: 'MANAGER', department: 'Sales' },
  { id: '2', email: 'employee@example.com', password: 'password', role: 'EMPLOYEE', department: 'Engineering' }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role, department: user.department },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '8h' }
  );
  res.json({ token, user });
});

router.get('/me', (req, res) => {
  // For simplicity, no real auth parsing here in demo
  res.status(501).json({ error: 'Not implemented in demo. Use frontend stored user object.' });
});

export default router;