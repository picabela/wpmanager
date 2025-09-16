'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClientBrowser } from "@/lib/supabaseClient";

export default function LogoutPage() {
  const supabase = createClientBrowser();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.signOut().then(() => router.push('/'));
  }, []);
  return <p>Wylogowywanie…</p>;
}
