# Spider-Love

Experiencia web romántica e interactiva (React + TypeScript + Vite + Tailwind v4 + GSAP).

## Desarrollo
    npm install
    npm run dev
    npm run build      # genera dist/
    npm run typecheck

## Subir a GitHub
    git init
    git add .
    git commit -m "Spider-Love: primera versión"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/spider-love.git
    git push -u origin main

## Desplegar en Netlify
1. En Netlify: **Add new site → Import an existing project → GitHub** y elige el repositorio.
2. La configuración se toma de `netlify.toml` (build `npm run build`, publish `dist`, Node 20).
3. Pulsa **Deploy**. Cada `git push` a `main` publica automáticamente.

## Personalizar
- Textos: `src/App.tsx` · Arte SVG: `src/art.tsx` · Audio: `src/audio.ts`.
