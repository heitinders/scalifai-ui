'use client';
import { useEffect, useState } from 'react';
import { getJSON, postJSON } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
export default function Page(){
  const [nums,setNums]=useState<any[]>([]); const [biz,setBiz]=useState(''); const [did,setDid]=useState(''); const [tag,setTag]=useState(''); const [status,setStatus]=useState('');
  async function load(){ setNums(await getJSON('/admin/numbers')); } useEffect(()=>{ load(); },[]);
  async function submit(e:any){ e.preventDefault(); setStatus('Saving...'); try{ await postJSON('/admin/numbers', { business_id: biz, twilio_number: did, campaign_tag: tag||null }); setStatus('Saved ✔︎'); setBiz(''); setDid(''); setTag(''); load(); }catch(e:any){ setStatus('Error: '+e.message); } }
  return (<AuthGuard>
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-3"><h2 className="text-lg font-semibold">Map Number → Business</h2>
        <input className="w-full border rounded-md p-2" placeholder="Business ID (uuid)" value={biz} onChange={e=>setBiz(e.target.value)} required />
        <input className="w-full border rounded-md p-2" placeholder="+15551234567" value={did} onChange={e=>setDid(e.target.value)} required />
        <input className="w-full border rounded-md p-2" placeholder="Campaign tag (optional)" value={tag} onChange={e=>setTag(e.target.value)} />
        <button className="bg-slate-900 text-white px-4 py-2 rounded-md">Save</button><p className="text-sm text-slate-600">{status}</p>
      </form>
      <div className="bg-white p-6 rounded-xl shadow"><h2 className="text-lg font-semibold mb-3">Configured Numbers</h2>
        <table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th className="py-2">Number</th><th>Business</th><th>Campaign</th></tr></thead>
          <tbody>{nums.map(n=>(<tr key={n.id} className="border-t"><td className="py-2">{n.twilio_number}</td><td>{n.business_id}</td><td>{n.campaign_tag||''}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  </AuthGuard>);
}
