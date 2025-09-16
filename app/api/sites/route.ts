import { createClientServer } from "@/lib/supabaseClient";
import { z } from "zod";
import { encrypt } from "@/lib/crypto";

const Body = z.object({
  url: z.string().url(),
  wp_user: z.string().min(1),
  app_password: z.string().min(10)
});

export async function POST(req: Request) {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const json = await req.json();
  const parsed = Body.safeParse(json);
  if (!parsed.success) return Response.json({ error: 'Invalid body' }, { status: 400 });
  const { url, wp_user, app_password } = parsed.data;

  const encrypted = encrypt(app_password);
  const { data, error } = await supabase.from('sites').insert({
    user_id: user.id, url, wp_user, app_password_enc: encrypted
  }).select('id').single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ id: data.id });
}
