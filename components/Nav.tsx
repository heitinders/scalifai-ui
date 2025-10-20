'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
const items = [{href:'/',label:'Dashboard'},{href:'/businesses',label:'Businesses'},{href:'/leads',label:'Leads'},{href:'/calls',label:'Calls'},{href:'/numbers',label:'Phone Numbers'},{href:'/booking',label:'Booking'}];
export default function Nav(){
  const pathname = usePathname();
  return (<nav className="flex gap-3 items-center mb-6">
    {items.map(i=> <Link key={i.href} href={i.href} className={clsx('px-3 py-2 rounded-md text-sm', pathname===i.href?'bg-slate-900 text-white':'bg-white shadow hover:shadow-md')}>{i.label}</Link>)}
    <div className="flex-1" />
    <Link href="/login" className="text-sm text-blue-600">Login</Link>
  </nav>);
}
