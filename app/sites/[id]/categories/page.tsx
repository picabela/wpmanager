'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CategoriesPage() {
  const params = useParams<{ id: string }>();
  const [categories, setCategories] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    const r = await fetch(`/api/wp/${params.id}/categories`);
    const d = await r.json();
    if (r.ok) setCategories(d.categories || []);
    else setMsg(d.error);
  };

  useEffect(() => { load(); }, [params.id]);

  const add = async () => {
    const name = prompt('Nazwa kategorii');
    if (!name) return;
    const r = await fetch(`/api/wp/${params.id}/categories`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name }) });
    if (r.ok) load();
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h1>Kategorie</h1>
        <button className="btn" onClick={add}>+ Dodaj</button>
      </div>
      {msg && <p className="text-sm">{msg}</p>}
      <ul className="space-y-2">
        {categories.map((c:any)=> (<li key={c.id} className="text-sm">{c.name}</li>))}
      </ul>
    </div>
  )
}
