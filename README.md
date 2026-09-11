# 🌿 Célula Vegetal VR — Explorador 3D interactivo

Un viaje interactivo en 3D por el interior de una célula vegetal, basado en la
vista explosionada de una célula vegetal (*Lilium sp.*).

Navega libremente por el espacio celular, visita cada uno de los **14 organelos**
como checkpoints, aprende su función y responde una pregunta por organelo para
desbloquear logros y sumar puntos.

## ✨ Características

- 🧭 Escena 3D orbitable (React Three Fiber + drei) con 14 organelos modelados
- 📍 Checkpoints con etiquetas de estado (pendiente / activo / completado)
- 🎥 Cámara que vuela hacia el organelo seleccionado sin pelear con los controles
- 🎯 Quiz por organelo con puntos (+10 por acierto) y pantalla de victoria
- 📱 Panel lateral responsive con info, dato curioso y pregunta

## 🚀 Desarrollo

Requisitos: Node.js 18+ y npm.

```bash
npm install   # instala dependencias
npm run dev   # servidor de desarrollo en http://localhost:5173
```

## 🛠️ Scripts

| Script            | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR           |
| `npm run build`   | Typecheck (`tsc --noEmit`) + build a `dist/` |
| `npm run preview` | Sirve el build de producción localmente  |
| `npm run typecheck` | Solo verificación de tipos             |

El build genera un único `dist/index.html` autocontenido
(`vite-plugin-singlefile`), listo para desplegar en cualquier hosting estático.

## 🕹️ Controles

- **Arrastrar**: orbitar la escena
- **Rueda / pellizco**: acercar / alejar
- **Clic en un organelo**: abrir su ficha y quiz

## 🧱 Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · three.js · React Three Fiber · drei
