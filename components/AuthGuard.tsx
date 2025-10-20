'use client';
import { useEffect, useState } from 'react';
import { getJSON } from '@/lib/api';
export default function AuthGuard({ children }: { children: React.ReactNode }){
  const [ok, setOk] = useState<boolean|null>(null);
  useEffect(()=>{ getJSON('/auth/me').then(()=>setOk(true)).catch(()=>setOk(false)); },[]);
  if (ok===null) return <div className="p-6">Checking session…</div>;
  if (!ok) return <div className="p-6">Not logged in. Go to <a className="text-blue-600" href="/login">Login</a>.</div>;
  return <>{children}</>;
}
