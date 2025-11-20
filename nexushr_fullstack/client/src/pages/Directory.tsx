import { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  allowanceUsed: number;
  allowanceTotal: number;
}

export default function Directory() {
  const [items, setItems] = useState<Employee[]>([]);
  const [q, setQ] = useState('');

  const load = async () => {
    const res = await axios.get('/api/directory', { params: { q } });
    setItems(res.data.items);
  };

  useEffect(() => { load(); }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Directory</h1>
      <form onSubmit={onSearch} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Search name, role, dept"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="border rounded-md px-2 py-1 flex-1"
        />
        <button className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm">
          Search
        </button>
      </form>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(e => (
          <div key={e.id} className="bg-white rounded-3xl p-4 shadow-sm">
            <div className="font-semibold">{e.name}</div>
            <div className="text-sm text-slate-500">{e.role} • {e.department}</div>
            <div className="mt-2 text-xs text-slate-500">
              Allowance: {e.allowanceUsed}/{e.allowanceTotal} days used
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}