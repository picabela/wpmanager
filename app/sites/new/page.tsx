'use client';
import { useState } from 'react';

export default function NewSitePage() {
  const [url, setUrl] = useState('');
  const [user, setUser] = useState('');
  const [appPass, setAppPass] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, wp_user: user, app_password: appPass })
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) setMsg('Błąd: ' + data.error);
    else setMsg('Dodano stronę. Możesz przejść do dashboardu.');
  };

  return (
    <div className="max-w-lg mx-auto card">
      <h1 className="mb-4">Dodaj stronę WordPress</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label">Adres strony (https://example.com)</label>
          <input className="input" value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://twoja-strona.pl" />
        </div>
        <div>
          <label className="label">Użytkownik WordPress</label>
          <input className="input" value={user} onChange={e => setUser(e.target.value)} required />
        </div>
        <div>
          <label className="label">Hasło aplikacji WordPress</label>
          <input className="input" type="password" value={appPass} onChange={e => setAppPass(e.target.value)} required />
          <p className="text-xs text-gray-400 mt-1">Hasło aplikacji zostanie BEZPIECZNIE zaszyfrowane w bazie.</p>
        </div>
        <button className="btn" disabled={busy}>{busy ? 'Zapisywanie…' : 'Dodaj'}</button>
        {msg && <p className="text-sm mt-3">{msg}</p>}
      </form>
    </div>
  )
}
