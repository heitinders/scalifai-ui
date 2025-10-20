'use client';
import { useEffect, useState } from 'react';
import { getJSON, postJSON } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
type Biz = { id?: string; name: string; industry?: string; email_forward_to?: string[]; twilio_number?: string|null; ai_instructions?: string; intake_fields?: any; };
export default function Page(){
  const [list,setList]=useState<Biz[]>([]); const [status,setStatus]=useState('');
  const [form,setForm]=useState<Biz>({ name:'', industry:'', email_forward_to:[], twilio_number:'', ai_instructions:'',
    intake_fields:{"type":"object","required":["full_name","phone","email","goal","preferred_time"],"properties":{"full_name":{"type":"string"},"phone":{"type":"string"},"email":{"type":"string"},"goal":{"type":"string"},"timeline":{"type":"string"},"preferred_time":{"type":"string"},"notes":{"type":"string"}}} });
  async function load(){ setList(await getJSON('/admin/businesses')); } useEffect(()=>{ load(); },[]);
  function update(k: keyof Biz, v:any){ setForm(p=>({...p,[k]:v})); }
  async function submit(e:any){ e.preventDefault(); setStatus('Saving...'); try{ await postJSON('/admin/businesses', {...form, email_forward_to:(form.email_forward_to||[]).filter(Boolean)}); setStatus('Saved ✔︎'); setForm({...form,name:'',industry:'',email_forward_to:[],twilio_number:'',ai_instructions:''}); load(); }catch(e:any){ setStatus('Error: '+e.message);} }
  return (<AuthGuard>
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-3"><h2 className="text-lg font-semibold">Add Business</h2>
        <input className="w-full border rounded-md p-2" placeholder="Name" value={form.name} onChange={e=>update('name',e.target.value)} required />
        <input className="w-full border rounded-md p-2" placeholder="Industry" value={form.industry||''} onChange={e=>update('industry',e.target.value)} />
        <input className="w-full border rounded-md p-2" placeholder="Forward to emails (comma-separated)" onChange={e=>update('email_forward_to', e.target.value.split(',').map(s=>s.trim()))} />
        <input className="w-full border rounded-md p-2" placeholder="Twilio Number (+15551234567)" value={form.twilio_number||''} onChange={e=>update('twilio_number',e.target.value)} />
        <textarea className="w-full border rounded-md p-2" rows={4} placeholder="AI Instructions" value={form.ai_instructions||''} onChange={e=>update('ai_instructions',e.target.value)} />
        <label className="block text-sm">Intake Schema (JSON)</label>
        <textarea className="w-full border rounded-md p-2 font-mono text-xs" rows={8} value={JSON.stringify(form.intake_fields,null,2)} onChange={e=>{ try{ update('intake_fields', JSON.parse(e.target.value)); } catch {} }} />
        <button className="bg-slate-900 text-white px-4 py-2 rounded-md">Save</button><p className="text-sm text-slate-600">{status}</p>
      </form>
      <div className="bg-white p-6 rounded-xl shadow"><h2 className="text-lg font-semibold mb-3">All Businesses</h2>
        <table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th className="py-2">Name</th><th>Industry</th><th>Emails</th><th>Twilio #</th></tr></thead>
          <tbody>{list.map(b=>(<tr key={b.id} className="border-t"><td className="py-2">{b.name}</td><td>{b.industry}</td><td>{(b.email_forward_to||[]).join(', ')}</td><td>{b.twilio_number||''}</td></tr>))}</tbody>
        </table></div>
    </div>
  </AuthGuard>);
}
