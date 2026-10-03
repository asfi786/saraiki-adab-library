# Saraiki Adab Library

A digital library of Saraiki literature — books, poetry, and prose in Saraiki, with a clean reading experience.

**Tech:** Next.js 14 + TypeScript + Tailwind.

## Features

- Trilingual UI (Saraiki / Urdu / English)
- Book catalogue with search and browsing
- Self-service admin book upload (PDF + cover), backed by GitHub repo storage + jsDelivr CDN

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your own values
npm run dev
```

> Note: `.env.local` is NOT included — apni values khud dalen.

**Live:** https://saraiki-adab-library-acme-88a6.vercel.app/
