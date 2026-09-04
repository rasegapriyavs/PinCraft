# PinCraft

A small starting point for a personal app that prepares Pinterest Pins. Pinterest authentication and publishing are deliberately not included yet.

> PinCraft is currently in active development. The interface helps prepare a Pin today; direct Pinterest publishing will be added in a future release.

## Run locally

1. Install the project packages with `pnpm install`.
2. Start the development server with `pnpm dev`.
3. Open the local address Vite prints in the terminal (usually `http://localhost:5173`).

Use `pnpm build` to check the TypeScript code and produce an optimized production build in `dist/`.

## Project layout

- `src/main.tsx` attaches React to the HTML page.
- `src/App.tsx` contains the PinCraft home page and its small amount of local UI state.
- `src/styles.css` contains the page styling.

Keeping the first version in these three files makes it easy to see where to add features as PinCraft grows.
