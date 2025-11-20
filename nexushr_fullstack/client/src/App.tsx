import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Absence from './pages/Absence';
import Directory from './pages/Directory';
import Documents from './pages/Documents';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 font-bold text-xl">Nexus HR</div>
        <nav className="p-4 space-y-2 text-sm">
          <a className="block hover:underline" href="/dashboard">Dashboard</a>
          <a className="block hover:underline" href="/absence">Absence</a>
          <a className="block hover:underline" href="/directory">Directory</a>
          <a className="block hover:underline" href="/documents">Documents</a>
        </nav>
      </div>
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/absence" element={<Absence />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </div>
    </div>
  );
}