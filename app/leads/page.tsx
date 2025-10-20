'use client';
import { useEffect, useState } from 'react';
import { getJSON } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
export default function Page(){
  const [list,setList]=useState<any[]>([]);
  useEffect(()=>{ getJSON('/admin/leads').then(setList); },[]);
  function toCSV(rows:any[]){ const cols=['full_name','email','phone','intent','quality_score','emailed_at','campaign_tag','source_did']; const header=cols.join(','); const lines=rows.map(r=>cols.map(c=>JSON.stringify(r[c] ?? (r.details&&r.details[c]) ?? '')).join(',')); return [header,...lines].join('\n'); }
  function exportCSV(){ const blob=new Blob([toCSV(list)],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='leads.csv'; a.click(); URL.revokeObjectURL(url); }
  return (<AuthGuard>
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">Leads</h2><button onClick={exportCSV} className="px-3 py-2 bg-slate-900 text-white rounded-md">Export CSV</button></div>
      <table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th className="py-2">Name</th><th>Email</th><th>Phone</th><th>Intent</th><th>Score</th><th>Campaign</th><th>DID</th><th>Emailed</th></tr></thead>
        <tbody>{list.map(l=>(<tr key={l.id} className="border-t"><td className="py-2">{l.full_name||''}</td><td><a className="text-blue-600" href={`mailto:${l.email||''}`}>{l.email||''}</a></td><td><a className="text-blue-600" href={`tel:${l.phone||''}`}>{l.phone||''}</a></td><td>{l.intent || (l.details&&l.details.goal) || ''}</td><td>{l.quality_score ?? ''}</td><td>{l.campaign_tag || ''}</td><td>{l.source_did || ''}</td><td>{l.emailed_at ? '✔︎' : '—'}</td></tr>))}</tbody>
      </table>
    </div>
  </AuthGuard>);
}
