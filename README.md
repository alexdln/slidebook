# Slidebook

Build polished, collaborative, and programmable slide decks with React and Next.js. Slidebook is an end‑to‑end toolkit for creating presentations with first‑class support for theming, live preview, and real‑time collaboration. AI‑assisted authoring is available through the integrated web editor.

## Overview

Slidebook enables you to author slides as JSX/TSX, style them with Tailwind, and run them in a modern Next.js app. Choose between a zero‑config simplified mode for quick presentations or a fully customizable professional mode for complete control. Real‑time features—including multi‑device control, host view, and QR sharing—are provided by an optional server.

## Packages

| Package | Description |
| --- | --- |
| `@slidebook/cli` | CLI to develop, build, run, or eject a Slidebook project. |
| `@slidebook/core` | Core components and logic: layout, rendering, state sync helpers. |
| `@slidebook/image` | Prebuilt Slidebook experience without custom coding. |
| `@slidebook/server` | Real‑time collaboration server (slide sync, remote control, QR, etc.). |

## Features

- **AI‑assisted authoring**: Generate or refine content directly in the web editor (not distributed as a standalone package)
- **Zero‑config start**: Drop TSX files into `slides/` and run immediately
- **Professional mode**: Eject to a full Next.js app for complete customization
- **Theming**: Ready‑made themes powered by Tailwind design tokens
- **Real‑time sync**: Multi‑device control, QR sharing, and host view
- **Speaker tools**: Speaker notes, next‑slide preview, and fast navigation

## Quick Start

### Simplified Mode

No configuration needed. Simply create a `slides/` folder and add your slide files:

```
slides/
  1.tsx
  2.tsx
  slide-3.tsx
```

### Professional Mode

For full control over structure and rendering, eject to a full Next.js project:

```bash
slidebook eject
```

This scaffolds a complete Next.js app wired to `@slidebook/core`.

## Examples

Check out live examples and demos at [slidebook.dev/presentations](https://slidebook.dev/presentations).

For local examples, see the [examples](https://github.com/alexdln/slidebook/examples) directory in this repository.

## Modes

### Simplified Mode

Author slides in `slides/` and run with the CLI. Ideal for quick decks, workshops, or sharing.

### Professional Mode

Eject to a full Next.js project for complete control over routing, data fetching, and rendering:

```bash
slidebook eject
```

This scaffolds a Next.js app wired to `@slidebook/core`.

## Commands

```bash
slidebook dev           # Start local development server with hot reload
slidebook build         # Build the app for production
slidebook start         # Run production build (app + optional server)
slidebook start app     # Run only the app
slidebook start server  # Run only the server
slidebook eject         # Switch to full custom project mode (Next.js)
```

## Recommended Stack

- **Tailwind CSS**: Preconfigured design tokens and themes
- **Framer Motion**: Smooth animations and transitions
- **Next.js**: App Router with Server Components and async data fetching

> [!NOTE]
> Slides are React Server Components by default, so you can use async logic, for example to fetch data directly inside a slide:
>
> ```tsx
> const data = await db.query("SELECT * FROM ...");
> ```

## Configuration

Configuration can be provided via config file, CLI arguments, or environment variables. Precedence order: `CLI argument > environment variable > config file > default`.

### Example `slidebook.config.js`

```ts
// @ts-check

/** @type {import('@slidebook/cli/lib/config').Config} */
export default {
  slide: {
    width: 1200,
    height: 600,
  },
  app: {
    serverUrl: "http://localhost:3000",
    qrUrl: "https://slidebook.dev",
    port: 3000,
  },
  auth: {
    password: "qwerty",
  },
};
```

### Full options

| Key | config path | arg | env var | Default |
| --- | --- | --- | --- | --- |
| serverUrl | `app.serverUrl` | `--serverUrl` | `SERVER_URL` | — |
| qrUrl | `app.qrUrl` | `--qrUrl` | `QR_URL` | — |
| port | `app.port` | `--port` | `PORT` | `3000` |
| password | `auth.password` | `--password` | `PASSWORD` | `qwerty` |
| width | `slide.width` | `--slideWidth` | `SLIDE_WIDTH` | `1200` |
| height | `slide.height` | `--slideHeight` | `SLIDE_HEIGHT` | `600` |
| cookiesFlags | `cookies.flags` | `--cookiesFlags` | `COOKIES_FLAGS` | `SameSite=Strict;` |
| authenticate | `auth.authenticate` | — | — | — |
| validate | `auth.validate` | — | — | — |

## Project structure

### Professional mode

```
.
├── src/
│   ├── app/                       # Next.js app directory
│   │   ├── [[...pathname]]/       # Slide route segment
│   │   │   └── page.tsx           # Renders current slide
│   │   ├── layout.tsx             # App layout with theme and wrapper
│   │   └── globals.css            # Global styles
│   └── slides/                    # Your slides, one file per slide
│       ├── 0.tsx                  # First slide
│       ├── 1.tsx                  # Second slide
│       └── index.tsx              # Optional wrapper for all slides
├── public/                        # Static assets
├── slidebook.config.js            # Config file
└── package.json
```

Slides segment (`src/app/[[...pathname]]/page.tsx`):

```tsx
import { RootPage } from "@slidebook/core/lib/components/root-page";
import { generateStaticParamsFactory } from "@slidebook/core/lib/lib/generate-static-params";
import { slides } from "../slides";

export const generateStaticParams = generateStaticParamsFactory(slides.length);

export default async function SlidePage({ params }: { params: Promise<{ pathname: string[] }> }) {
  const { pathname } = await params;
  return <RootPage segments={pathname} slides={slides} />;
}
```

Slides definition (`src/slides/index.tsx`):

```ts
export const slides = [
  { component: Slide1, notes: Notes1 },
  { component: Slide2 },
];
```

Layout (`src/app/layout.tsx`):

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SlideLayer } from "@slidebook/core/lib/components/slide-layer";
import { Layer } from "./slides/layer";

import "./globals.css";
import "@slidebook/core/lib/styles.css";

export const metadata: Metadata = {
  title: "Slidebook",
  description: "Advanced presentation tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={Inter({ subsets: ["latin"] }).className}>
        <Layer>
          <SlideLayer>{children}</SlideLayer>
        </Layer>
      </body>
    </html>
  );
}

export const dynamic = "error";
```

### Simplified mode

```
.
├── slides/             # Your slides, one file per slide
│   ├── 0.tsx           # First slide
│   ├── 1.tsx           # Second slide
│   └── layer.tsx       # Optional wrapper for all slides
├── public/             # Static assets
├── slidebook.config.js # Config file
└── package.json
```

Example slide (`slides/1.tsx`):

```tsx
export const Slide = () => (
  <h1 className="text-4xl font-bold text-center text-white">Hello World</h1>
);

export const Notes = () => <p>Welcome notes for host view</p>;
```

Layer (`slides/layer.tsx`):

```tsx
export const Layer = ({ children }) => (
  <div className="p-12">{children}</div>
);
```

## Themes

Import a theme in `layout.tsx` (professional mode) or `slides/layer.tsx` (simplified mode):

```ts
import "@slidebook/core/lib/assets/themes/pink-neutral.css";
```

Available themes: `blue-neutral`, `blue-slate`, `green-neutral`, `green-slate`, `orange-neutral`, `orange-slate`, `pink-neutral`, `pink-slate`.

## Real‑Time Sync and Host View

When the host changes a slide, theme, or QR code, all connected clients update instantly across devices. The host view displays the current slide, next slide preview, speaker notes, and navigation controls. Access requires a password configured via config file, CLI arguments, or environment variables.

## Running the App

### Running Together (Recommended)

Run both the app and server together:

```bash
slidebook start
```

Runs both server and editor in one command — enabling:

- Real-time sync across devices
- QR code sharing
- Host view & navigation

> [!TIP]
> Recommended for local use and self-hosting

### Running Separately

For serverless hosts like Vercel that don't support WebSockets, run the app and server separately:

```bash
slidebook start server
slidebook start app
```

Useful if you're deploying to environments like **Vercel**, which **do not support WebSocket or real-time infrastructure**.

> [!IMPORTANT]
> When running separately, pass the server URL to the app

```js
// slidebook.config.js
export default {
  app: {
    serverUrl: "https://your-slidebook-server.example.com",
  },
};
```

## Deployment

- **Serverless hosts (Vercel)**: Deploy the app only. Real‑time features require a separately deployed server instance and `serverUrl` configuration.
- **Self‑hosted (Docker, Fly.io, VPS)**: Run `slidebook start` to launch both services together, or run them independently and configure `serverUrl` in your config.

## Contributing

Issues and pull requests are welcome. If you enjoy using Slidebook, consider starring the repository—it helps guide prioritization and future development.

## License

[MIT](https://github.com/alexdln/slidebook)
