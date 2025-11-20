import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

interface LeaveRequest {
  id: string;
  userId: string;
  type: 'holiday' | 'sickness' | 'carry_over';
  startDate: string;
  endDate: string;
  duration: number;
  status: 'pending' | 'approved' | 'declined';
  paymentType?: 'paid' | 'unpaid' | 'discretionary';
  reason?: string;
}

const leaveRequests: LeaveRequest[] = [];

router.get('/', (_req: Request, res: Response) => {
  res.json({ items: leaveRequests });
});

router.post('/', (req: Request, res: Response) => {
  const { userId, type, startDate, endDate, duration, reason } = req.body;
  const id = String(leaveRequests.length + 1);
  const lr: LeaveRequest = {
    id,
    userId,
    type,
    startDate,
    endDate,
    duration,
    status: 'pending',
    reason
  };
  leaveRequests.push(lr);
  res.status(201).json(lr);
});

router.patch('/:id/approve', (req: Request, res: Response) => {
  const { id } = req.params;
  const { paymentType } = req.body;
  const lr = leaveRequests.find(l => l.id === id);
  if (!lr) return res.status(404).json({ error: 'Not found' });
  lr.status = 'approved';
  lr.paymentType = paymentType || 'paid';
  res.json(lr);
});

router.patch('/:id/decline', (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  const lr = leaveRequests.find(l => l.id === id);
  if (!lr) return res.status(404).json({ error: 'Not found' });
  lr.status = 'declined';
  lr.reason = reason || lr.reason;
  res.json(lr);
});

export default router;