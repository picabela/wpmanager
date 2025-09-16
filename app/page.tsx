import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h1>Panel zarządzania stronami <span className="text-raspberry-400">WordPress</span></h1>
        <p className="text-gray-300">Dodawaj strony, twórz artykuły, zarządzaj kategoriami — wszystko z jednego miejsca. Bezpiecznie, szybko i wygodnie.</p>
        <div className="flex gap-3">
          <Link className="btn" href="/dashboard">Przejdź do panelu</Link>
          <a className="btn" href="/auth/login">Zaloguj</a>
        </div>
      </div>
      <div className="card">
        <ul className="space-y-2 text-sm">
          <li><span className="badge">Bezpieczeństwo</span> Szyfrowanie haseł aplikacji (AES‑256‑GCM)</li>
          <li><span className="badge">Supabase</span> Logowanie i baza danych</li>
          <li><span className="badge">WordPress REST</span> Publikacja artykułów i kategorie</li>
        </ul>
      </div>
    </div>
  )
}
