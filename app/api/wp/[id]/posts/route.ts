import { createClientServer } from "@/lib/supabaseClient";
import { decrypt } from "@/lib/crypto";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: site } = await supabase.from('sites').select('*').eq('id', params.id).eq('user_id', user.id).single();
  if (!site) return Response.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const pass = decrypt(site.app_password_enc);
  const auth = Buffer.from(`${site.wp_user}:${pass}`).toString('base64');
  const url = site.url.replace(/\/$/, '');

  const payload: any = {
    title: body.title,
    content: body.content,
    status: 'publish',
  };
  if (Array.isArray(body.categories)) payload.categories = body.categories;

  const r = await fetch(`${url}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify(payload)
  });
  const text = await r.text();
  if (!r.ok) return Response.json({ error: `WP error: ${r.status} ${text}` }, { status: 500 });
  try {
    const post = JSON.parse(text);
    return Response.json({ id: post.id, link: post.link });
  } catch {
    return Response.json({ ok: true });
  }
}
