import { createClientServer } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <div className="card"><p>Nie zalogowano. <a className="btn mt-3" href="/auth/login">Zaloguj</a></p></div>;
  }

  const { data: sites } = await supabase.from('sites').select('id, url, wp_user, created_at').eq('user_id', user.id).order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Twoje strony</h1>
        <a href="/sites/new" className="btn">Dodaj stronę</a>
      </div>

      {(!sites || sites.length === 0) && <div className="card">Brak stron. Dodaj pierwszą.</div>}

      <div className="grid md:grid-cols-2 gap-4">
        {sites?.map(site => (
          <div key={site.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{site.url}</div>
                <div className="text-sm text-gray-400">Użytkownik WP: {site.wp_user}</div>
              </div>
              <div className="flex gap-2">
                <Link className="btn" href={`/sites/${site.id}/new-post`}>Nowy artykuł</Link>
                <Link className="btn" href={`/sites/${site.id}/categories`}>Kategorie</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
