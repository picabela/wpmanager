# WP Panel App

Panel do zarządzania wieloma stronami WordPress: dodawanie stron przez hasła aplikacji, tworzenie artykułów, zarządzanie kategoriami. Bezpieczne szyfrowanie haseł aplikacji, logowanie przez Supabase.

## Szybki start

1. Skopiuj `.env.example` do `.env.local` i uzupełnij klucze Supabase + ENCRYPTION_KEY.
2. W Supabase uruchom `supabase.sql` w SQL Editor (utworzy tabelę i polityki RLS).
3. `npm i` i `npm run dev`.
4. Zaloguj się magic linkiem i dodaj pierwszą stronę.

## Bezpieczeństwo
- Hasła aplikacji WP są szyfrowane (AES-256-GCM) i nigdy nie wysyłane do klienta.
- API `/api/...` sprawdza sesję użytkownika przez Supabase SSR.
- RLS w bazie gwarantuje, że użytkownik widzi tylko swoje rekordy.

## Publikacja postów
- Używamy WordPress REST API + Basic Auth (użytkownik: hasło aplikacji).
- Kategorie: GET/POST `/wp-json/wp/v2/categories`.
