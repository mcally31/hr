import { Router } from 'express';

const router = Router();

const employees = [
  { id: '1', name: 'Alice Manager', role: 'Manager', department: 'Sales', allowanceUsed: 3, allowanceTotal: 25 },
  { id: '2', name: 'Bob Dev', role: 'Engineer', department: 'Engineering', allowanceUsed: 5, allowanceTotal: 25 }
];

router.get('/', (req, res) => {
  const q = (req.query.q as string || '').toLowerCase();
  let results = employees;
  if (q) {
    results = employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q)
    );
  }
  res.json({ items: results });
});

export default router;