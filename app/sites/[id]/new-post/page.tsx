'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Category = { id: number; name: string };

export default function NewPostPage() {
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/wp/${params.id}/categories`).then(r => r.json()).then(d => {
      if (d.error) setMsg('Błąd: ' + d.error);
      else setCategories(d.categories || []);
    });
  }, [params.id]);

  const addCategory = async () => {
    const name = prompt('Nazwa nowej kategorii');
    if (!name) return;
    const res = await fetch(`/api/wp/${params.id}/categories`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ name }) });
    const data = await res.json();
    if (res.ok) setCategories([...(categories||[]), data]);
    else alert('Błąd: ' + data.error);
  };

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await fetch(`/api/wp/${params.id}/posts`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, content, categories: selected })
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) setMsg('Błąd: ' + data.error);
    else setMsg('Opublikowano post: ' + data.link);
  };

  return (
    <div className="max-w-2xl mx-auto card space-y-4">
      <h1>Nowy artykuł</h1>
      <form onSubmit={publish} className="space-y-4">
        <div>
          <label className="label">Tytuł</label>
          <input className="input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="label">Treść (HTML lub Markdown)</label>
          <textarea className="input" style={{minHeight: 220}} value={content} onChange={e => setContent(e.target.value)} placeholder="<p>Witaj świecie</p>" />
        </div>
        <div>
          <label className="label">Kategorie</label>
          <div className="flex flex-wrap gap-2">
            {categories?.map(c => (
              <label key={c.id} className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={selected.includes(c.id)} onChange={(e)=>{
                  setSelected(prev => e.target.checked ? [...prev, c.id] : prev.filter(x=>x!==c.id));
                }} />
                {c.name}
              </label>
            ))}
            <button type="button" className="btn" onClick={addCategory}>+ Dodaj kategorię</button>
          </div>
        </div>
        <button className="btn" disabled={busy}>{busy ? 'Publikuję…' : 'Publikuj'}</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </div>
  );
}
