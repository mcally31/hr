export default function Documents() {
  const docs = [
    { name: 'Employee Handbook', url: '#' },
    { name: 'Health & Safety Policy', url: '#' },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Documents</h1>
      <div className="bg-white rounded-3xl p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Policies</h2>
        <ul className="space-y-1 text-sm">
          {docs.map(d => (
            <li key={d.name}>
              <a href={d.url} className="text-blue-600 hover:underline">{d.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}