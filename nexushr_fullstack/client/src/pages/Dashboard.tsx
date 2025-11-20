export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Allowance Left</div>
          <div className="text-2xl font-bold">20 days</div>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Sickness (Bradford)</div>
          <div className="text-2xl font-bold">32</div>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Team Absent Today</div>
          <div className="text-2xl font-bold">1</div>
        </div>
      </div>
    </div>
  );
}