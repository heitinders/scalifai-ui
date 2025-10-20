import './globals.css'
import Nav from '@/components/Nav'
export const metadata = { title: 'ScalifAI Admin', description: 'Voice Leads Dashboard' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><div className="max-w-6xl mx-auto p-6"><h1 className="text-2xl font-bold mb-4">ScalifAI – Admin</h1><Nav />{children}</div></body></html>);
}
