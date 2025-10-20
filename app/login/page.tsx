'use client';
import { useState } from 'react';
import { postJSON } from '@/lib/api';
import { useRouter } from 'next/navigation';
export default function Page(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [status,setStatus]=useState('');
  const router = useRouter();
  async function submit(e:any){ e.preventDefault(); setStatus('Signing in...'); try{ await postJSON('/auth/login',{email,password}); router.push('/'); }catch(e:any){ setStatus('Error: '+e.message); } }
  return (<div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow"><h2 className="text-xl font-semibold mb-4">Admin Login</h2>
    <form className="space-y-3" onSubmit={submit}><input className="w-full border rounded-md p-2" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
    <input type="password" className="w-full border rounded-md p-2" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
    <button className="w-full bg-slate-900 text-white py-2 rounded-md">Sign in</button></form><p className="text-sm text-slate-600 mt-3">{status}</p></div>);
}
