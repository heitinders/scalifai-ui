import AuthGuard from '@/components/AuthGuard'
import Link from 'next/link'
export default function Page(){
  return (<AuthGuard>
    <div className="grid md:grid-cols-3 gap-4">
      <Link href="/businesses" className="block p-6 rounded-xl bg-white shadow hover:shadow-md"><h2 className="text-lg font-semibold">Businesses</h2><p className="text-slate-600">Manage profiles, schema, instructions.</p></Link>
      <Link href="/leads" className="block p-6 rounded-xl bg-white shadow hover:shadow-md"><h2 className="text-lg font-semibold">Leads</h2><p className="text-slate-600">Browse leads, export CSV.</p></Link>
      <Link href="/calls" className="block p-6 rounded-xl bg-white shadow hover:shadow-md"><h2 className="text-lg font-semibold">Calls</h2><p className="text-slate-600">Transcripts & recordings.</p></Link>
      <Link href="/numbers" className="block p-6 rounded-xl bg-white shadow hover:shadow-md"><h2 className="text-lg font-semibold">Phone Numbers</h2><p className="text-slate-600">Map numbers to campaigns.</p></Link>
      <Link href="/booking" className="block p-6 rounded-xl bg-white shadow hover:shadow-md"><h2 className="text-lg font-semibold">Booking</h2><p className="text-slate-600">Send calendar invites.</p></Link>
    </div>
  </AuthGuard>);
}
