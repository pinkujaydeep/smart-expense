# Gemini 3.8 Flash migration

The AI coach now defaults to `gemini-3.8-flash`.

Required Netlify variable: `GEMINI_API_KEY`
Optional: `GEMINI_MODEL` (defaults to `gemini-3.8-flash`)

The old Gemini 2.5 Flash reference was removed. The request now uses Gemini 3 thinking configuration with `thinkingLevel: low`.
