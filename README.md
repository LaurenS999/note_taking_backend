# Note Taking

Note Taking adalah aplikasi manajemen catatan harian (daily notes) berbasis web yang dirancang untuk kemudahan akses di mana saja. Dengan antarmuka yang responsif, pengguna dapat mencatat ide, tugas, atau agenda penting secara praktis melalui perangkat apa pun.
Aplikasi ini dibangun dengan arsitektur modern yang memisahkan antara Frontend dan Backend untuk efisiensi performa:

- Frontend: Dibangun dengan React dan dideploy melalui Netlify.
- Backend: Mengelola data dan API, berjalan di platform Railway.

Aplikasi ini membutuhkan Frontend untuk berjalan. Kamu bisa menemukan repository frontend-nya di sini: [LaurenS999/Note_Taking_frontend](https://github.com/LaurenS999/note_taking_frontend)."

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MySQL
- Deployment: Railway

## Environment Variables

- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=
- DB_NAME=note_taking
- DB_PORT=5000
- APP_ORIGIN=https://lauren-note-taking-app.netlify.app  # Untuk Production (Netlify)
- APP_ORIGIN=http://localhost:3000  # Untuk Lokal/Development

### Cara Instalasi Lokal

1. git clone
2. npm install
3. Setting .env
4. node index.js
