'use client';
import { useEffect, useState } from 'react';
import { getJSON } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
function fmt(dt?:string){ try{ return new Date(dt||'').toLocaleString(); }catch{return dt||'';} }
export default function Page(){
  const [list,setList]=useState<any[]>([]); const [sel,setSel]=useState<any|null>(null);
  async function load(){ const calls=await getJSON('/admin/calls'); setList(calls); if (calls[0]) show(calls[0].id); }
  async function show(id:string){ const d=await getJSON('/admin/calls/'+id); setSel(d); }
  useEffect(()=>{ load(); },[]);
  return (<AuthGuard>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow"><h2 className="text-lg font-semibold mb-3">Recent Calls</h2>
        <table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th className="py-2">Started</th><th>From</th><th>Status</th><th>Disposition</th></tr></thead>
          <tbody>{list.map(c=>(<tr key={c.id} className="border-t hover:bg-slate-50 cursor-pointer" onClick={()=>show(c.id)}>
            <td className="py-2">{fmt(c.started_at)}</td><td>{c.from_number||''}</td><td>{c.status||''}</td><td>{c.disposition||''}</td></tr>))}</tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-xl shadow"><h2 className="text-lg font-semibold mb-3">Details</h2>
        {!sel ? <p>Select a call</p> : (<div className="text-sm text-slate-700 space-y-2">
          <p><b>Started:</b> {fmt(sel.started_at)}</p><p><b>Ended:</b> {fmt(sel.ended_at)}</p><p><b>Status:</b> {sel.status||''}</p><p><b>Disposition:</b> {sel.disposition||''}</p>
          {sel.recording_url ? <audio controls src={`${sel.recording_url}.mp3`} className="w-full mt-2"></audio> : null}
          <div className="mt-4"><p className="font-semibold">Transcript</p><pre className="bg-slate-100 p-3 rounded-md overflow-auto whitespace-pre-wrap">{sel.transcript||''}</pre></div>
        </div>)}
      </div>
    </div>
  </AuthGuard>);
}
