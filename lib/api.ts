'use client';
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
export async function api(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) }, credentials: 'include', cache: 'no-store' });
  if (!res.ok) throw new Error(await res.text());
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}
export async function getJSON(path: string) { return api(path); }
export async function postJSON(path: string, body: any) { return api(path, { method: 'POST', body: JSON.stringify(body||{}) }); }
