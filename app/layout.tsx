import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'WP Panel',
  description: 'Panel zarządzania stronami WordPress',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-raspberry-900/40 bg-black/30">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-white font-semibold text-lg">WP<span className="text-raspberry-400">Panel</span></Link>
              <nav className="flex gap-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/auth/logout">Wyloguj</Link>
              </nav>
            </div>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="text-center text-sm text-gray-400 py-8">© {new Date().getFullYear()} WP Panel</footer>
        </div>
      </body>
    </html>
  )
}
