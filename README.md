# Mystery Date

A frontend-only surprise date planner. Hosts create three clues, share the
encoded experience in a URL, and guests unlock the final reveal one riddle at
a time.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

All persistence uses browser LocalStorage. Share links contain the complete
date experience as a URL-safe Base64 payload; there is no backend.
