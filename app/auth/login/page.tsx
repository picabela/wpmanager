'use client';
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientBrowser } from "@/lib/supabaseClient";

export default function LoginPage() {
  const supabase = createClientBrowser();
  return (
    <div className="max-w-md mx-auto card">
      <h1 className="mb-4">Logowanie</h1>
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{
          theme: ThemeSupa,
          variables: { default: { colors: { brand: '#e83c72', brandAccent: '#cc245d' } } }
        }}
        localization={{ variables: { magic_link: { email_input_label: 'Email', button_label: 'Wyślij link logowania' }}}}
        showLinks={false}
        redirectTo={typeof window !== 'undefined' ? window.location.origin + '/dashboard' : undefined}
      />
      <p className="text-sm text-gray-400 mt-4">Używamy logowania magic link (email). Po kliknięciu w link wrócisz do panelu.</p>
    </div>
  );
}
