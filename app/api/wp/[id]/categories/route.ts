import { createClientServer } from "@/lib/supabaseClient";
import { decrypt } from "@/lib/crypto";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: site, error } = await supabase.from('sites').select('*').eq('id', params.id).eq('user_id', user.id).single();
  if (error || !site) return Response.json({ error: 'Not found' }, { status: 404 });
  const pass = decrypt(site.app_password_enc);
  const auth = Buffer.from(`${site.wp_user}:${pass}`).toString('base64');
  const url = site.url.replace(/\/$/, '');

  const r = await fetch(`${url}/wp-json/wp/v2/categories?per_page=100`, {
    headers: { Authorization: `Basic ${auth}` }
  });
  if (!r.ok) {
    const t = await r.text();
    return Response.json({ error: `WP error: ${r.status} ${t}` }, { status: 500 });
  }
  const categories = await r.json();
  return Response.json({ categories });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: site } = await supabase.from('sites').select('*').eq('id', params.id).eq('user_id', user.id).single();
  if (!site) return Response.json({ error: 'Not found' }, { status: 404 });
  const pass = decrypt(site.app_password_enc);
  const auth = Buffer.from(`${site.wp_user}:${pass}`).toString('base64');
  const url = site.url.replace(/\/$/, '');

  const body = await req.json();
  const r = await fetch(`${url}/wp-json/wp/v2/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ name: body.name })
  });
  if (!r.ok) {
    const t = await r.text();
    return Response.json({ error: `WP error: ${r.status} ${t}` }, { status: 500 });
  }
  const cat = await r.json();
  return Response.json(cat);
}
