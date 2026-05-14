# College Enquiry Chatbot

Production-oriented starter project: a **static responsive frontend** (HTML/CSS/JS), a **Node.js + Express** REST API, and a **MySQL** knowledge base for a college enquiry assistant. An **admin JSON API** (JWT + bcrypt-compatible hashes via `bcryptjs`) powers a separate **staff dashboard** for CRUD and logs.

## Features

- **Public chat**: FAQ similarity search, admission Q&A, and dynamic answers from relational tables (courses, departments, fees, scholarships, hostel, placements, dates, contacts).
- **Intent engine**: weighted intent detection with tokenization, stop-word filtering, synonym/fuzzy matching in `backend/services/intentService.js`.
- **NLP helpers**: reusable scoring/token functions in `backend/services/nlp.js`.
- **Translation**: optional Google Cloud Translation v2 when `GOOGLE_TRANSLATE_API_KEY` is set; FAQ/admission rows can store human translations in `faq_translations` and `admission_question_translations`.
- **Languages**: English, Hindi, Tamil, Malayalam (`en`, `hi`, `ta`, `ml`).
- **Admin**: username/password login, JWT, activity logs, CRUD for all catalog tables, user query logs, analytics.
- **Security**: admin routes require `Authorization: Bearer <token>`; the public site **does not link** to the admin pages (open `admin-login.html` directly for staff).

## Repository layout

```
college-chatbot/
  frontend/           # Static site + chat UI + admin UI
  backend/            # Express API
  database/           # schema.sql + seed.sql
```

## Prerequisites

- Node.js 18+ recommended  
- MySQL 8+ (or compatible)

## 1. Create the database

```sql
CREATE DATABASE college_enquiry_chatbot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Run (in order):

1. `database/schema.sql` — creates all required tables.  
2. `database/seed.sql` — inserts realistic sample data.
3. Existing installations only: `database/migration_2026_05_intent_reco.sql`.

> `schema.sql` drops existing tables with the same names before recreating them. Use only on a fresh database or backup first.

## 2. Configure environment

Copy `backend/.env.example` to `backend/.env` and set at least:

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (long random string)

Optional:

- `GOOGLE_TRANSLATE_API_KEY` — enables machine translation of **dynamic** English answers into the visitor’s language.
- `BOOTSTRAP_ADMIN_*` — used by the bootstrap script (defaults are fine for local dev).

## 3. Install & run the API

```bash
cd backend
npm install
npm run bootstrap:admin
npm run dev
```

- API base: `http://localhost:5000`
- Health: `GET /health`
- Chat: `POST /chat` with JSON `{ "message": "...", "language": "en" }`
- Suggestions: `GET /chat/suggestions?q=adm`

## 4. Open the website

The server also serves `frontend/` as static files **after** API routes are registered.

Open **`http://localhost:5000/`** in your browser (same origin as the API — avoids CORS issues).

**Staff admin**

- Navigate directly to `http://localhost:5000/admin-login.html` (not linked from public pages).
- Default credentials after `npm run bootstrap:admin`: username **`admin`**, password **`Admin@123`** (change immediately in production).

## API overview (selected)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/chat` | No | Chatbot reply |
| GET | `/chat/suggestions` | No | Relevance-ranked autocomplete (max 6) |
| POST | `/admin/login` | No | `{ "username", "password" }` → JWT |
| GET/POST/PUT/DELETE | `/admin/faqs` … | Yes | FAQ CRUD |
| GET/POST/PUT/DELETE | `/admin/admission-questions` … | Yes | Admission CRUD |
| GET/POST/PUT/DELETE | `/admin/departments` … | Yes | Departments |
| GET/POST/PUT/DELETE | `/admin/courses` … | Yes | Courses |
| GET/POST/PUT/DELETE | `/admin/fees` … | Yes | Fee rows |
| GET/POST/PUT/DELETE | `/admin/scholarships` … | Yes | Scholarships |
| GET/POST/PUT/DELETE | `/admin/hostels` … | Yes | Hostel |
| GET/POST/PUT/DELETE | `/admin/placements` … | Yes | Placements |
| GET/POST/PUT/DELETE | `/admin/contacts` … | Yes | Support contacts |
| GET/POST/PUT/DELETE | `/admin/important-dates` … | Yes | Dates |
| GET | `/admin/query-logs` | Yes | `users_queries` (input, intent, response, language, timestamp) |
| GET | `/admin/analytics` | Yes | Simple aggregates |
| GET | `/admin/admin-activity` | Yes | Admin audit trail |

Send `Authorization: Bearer <token>` for protected routes.

## Customising content

- Edit FAQs and catalog tables via the **admin dashboard** or SQL migrations.
- Improve multilingual answers by inserting rows into `faq_translations` / `admission_question_translations`.

## Troubleshooting

- **Blank chat / network errors**: confirm the backend is running and you are using `http://localhost:5000` (or set `?apiBase=http://localhost:5000` on the page URL, or `localStorage.college_api_base`).
- **MySQL auth errors**: verify `DB_USER` / `DB_PASSWORD` and that the schema has been applied.
- **Admin 401**: run `npm run bootstrap:admin` once, or check `JWT_SECRET` consistency after restarts.

## License

Use and modify freely for your institution’s internal projects.
