# Plataforma de Evaluaciones Psicológicas (PWA)

Aplicación PWA full‑stack (frontend Vite + funciones serverless en `/api`) para administrar y gestionar cuestionarios psicológicos (BAI, EPDS, BDI‑II) con panel de administración.

## Desarrollo local

Requisitos: Node.js 18+

1. Instalar dependencias
2. Ejecutar el entorno de desarrollo

```pwsh
npm install
npm run dev
```

Frontend corre en http://localhost:5173

Para probar funciones serverless localmente puede usar la CLI de Vercel (opcional): `vercel dev`.

## Variables de entorno

Cree un archivo `.env` (o configure en Vercel):

```
JWT_SECRET=replace-this
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin1234
# Vercel Postgres: variables se inyectan automáticamente al desplegar (no necesita configurarlas manualmente)
```

## Despliegue en Vercel (unificado)

- Conecte este repositorio a Vercel.
- Framework: Vite. Carpeta de salida: `dist`.
- Las funciones en `/api` se despliegan automáticamente como serverless.
- Base de datos: Vercel Postgres (recomendado). Ejecute `npm run db:setup` para ver el SQL del esquema si quiere crear tablas manualmente.

## API

- POST `/api/auth/login` → devuelve JWT para admin
- GET `/api/quizzes` → lista metadatos de cuestionarios
- POST `/api/results` → guarda resultado y respuestas
- GET `/api/admin/results` (JWT) → lista resultados
- GET `/api/admin/export` (JWT) → CSV UTF‑8 con BOM, columnas `fecha` y `hora`

## Notas

- Íconos PWA en `public/pwa-*.png` son placeholders. Reemplácelos por imágenes reales.
- La exportación CSV incluye BOM (\uFEFF) y divide timestamp en dos columnas: `fecha` (DD/MM/YYYY) y `hora` (HH:MM:SS).# selfdig-dreamcare
