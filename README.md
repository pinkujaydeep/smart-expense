# Smart Expense AI

Monthly salary-management PWA. No daily expense entry.

Features: income, recurring commitments, savings target, goals, available-to-spend, spending guide, local Smart Coach, AI Coach, insights, local storage, JSON backup, PWA and Netlify Function.

## Netlify deployment
1. Extract/upload this project to Netlify (or connect its GitHub repo).
2. `netlify.toml` configures publish `.` and functions `netlify/functions`.
3. Netlify Site configuration -> Environment variables -> add `GEMINI_API_KEY`.
4. Redeploy.
5. Open the HTTPS site on your phone and Add to Home Screen / Install.

The API key stays server-side. Do not put it in app.js. Gemini free quotas/availability can change, so check current provider terms. The calculator itself is deterministic; AI only explains/suggests. This is not professional financial advice.
