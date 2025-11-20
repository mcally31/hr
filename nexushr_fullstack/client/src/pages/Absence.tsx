import { useEffect, useState } from 'react';
import axios from 'axios';

interface LeaveRequest {
  id: string;
  userId: string;
  type: 'holiday' | 'sickness' | 'carry_over';
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
}

export default function Absence() {
  const [items, setItems] = useState<LeaveRequest[]>([]);
  const [form, setForm] = useState({
    type: 'holiday',
    startDate: '',
    endDate: '',
    duration: 1,
    reason: ''
  });

  useEffect(() => {
    axios.get('/api/leave').then(res => setItems(res.data.items));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      userId: '2',
      ...form
    };
    const res = await axios.post('/api/leave', payload);
    setItems(prev => [...prev, res.data]);
    setForm({ type: 'holiday', startDate: '', endDate: '', duration: 1, reason: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Absence</h1>
      <form onSubmit={submit} className="bg-white rounded-3xl p-4 shadow-sm space-y-3 max-w-md">
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            className="border rounded-md px-2 py-1 w-full"
          >
            <option value="holiday">Holiday</option>
            <option value="sickness">Sickness</option>
            <option value="carry_over">Carry over</option>
          </select>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm mb-1">Start date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">End date</label>
            <input
              type="date"
              value={form.endDate}
              onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Duration (days)</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            value={form.duration}
            onChange={e => setForm(f => ({ ...f, duration: Number(e.target.value) }))}
            className="border rounded-md px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Reason</label>
          <textarea
            value={form.reason}
            onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
            className="border rounded-md px-2 py-1 w-full"
          />
        </div>
        <button className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm">
          Submit request
        </button>
      </form>

      <div className="bg-white rounded-3xl p-4 shadow-sm">
        <h2 className="font-semibold mb-2">My requests</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-1">Type</th>
              <th className="py-1">Dates</th>
              <th className="py-1">Duration</th>
              <th className="py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t">
                <td className="py-1 capitalize">{item.type}</td>
                <td className="py-1">{item.startDate} → {item.endDate}</td>
                <td className="py-1">{item.duration}</td>
                <td className="py-1">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}