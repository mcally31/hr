import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('nexushr_token', res.data.token);
      localStorage.setItem('nexushr_user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={submit} className="bg-white rounded-3xl shadow-md p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center">Sign in to Nexus HR</h1>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="border rounded-md px-2 py-1 w-full"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            className="border rounded-md px-2 py-1 w-full"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-600 text-white rounded-full py-2 text-sm">
          Sign in
        </button>
      </form>
    </div>
  );
}