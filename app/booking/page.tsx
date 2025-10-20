'use client';
import { useState } from 'react';
import { postJSON } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
export default function Page(){
  const [to,setTo]=useState(''); const [date,setDate]=useState(''); const [time,setTime]=useState('10:00'); const [dur,setDur]=useState(30); const [name,setName]=useState(''); const [status,setStatus]=useState('');
  async function submit(e:any){ e.preventDefault(); setStatus('Sending...'); try{ const startISO=new Date(`${date}T${time}:00`).toISOString(); const endISO=new Date(new Date(startISO).getTime()+dur*60000).toISOString(); await postJSON('/admin/book',{to,startISO,endISO,name}); setStatus('Invite sent ✔︎'); }catch(e:any){ setStatus('Error: '+e.message); } }
  return (<AuthGuard>
    <form onSubmit={submit} className="max-w-lg bg-white p-6 rounded-xl shadow space-y-3"><h2 className="text-lg font-semibold">Send Calendar Invite</h2>
      <input className="w-full border rounded-md p-2" placeholder="Recipient email" value={to} onChange={e=>setTo(e.target.value)} required />
      <div className="grid grid-cols-2 gap-3"><input type="date" className="w-full border rounded-md p-2" value={date} onChange={e=>setDate(e.target.value)} required />
        <input type="time" className="w-full border rounded-md p-2" value={time} onChange={e=>setTime(e.target.value)} required /></div>
      <input type="number" className="w-full border rounded-md p-2" value={dur} onChange={e=>setDur(parseInt(e.target.value||'30',10))} />
      <input className="w-full border rounded-md p-2" placeholder="Lead name (optional)" value={name} onChange={e=>setName(e.target.value)} />
      <button className="bg-slate-900 text-white px-4 py-2 rounded-md">Send Invite</button><p className="text-sm text-slate-600">{status}</p>
    </form>
  </AuthGuard>);
}
