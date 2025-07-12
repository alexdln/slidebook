# Slidebook

Slidebook is a flexible ecosystem for building AI-assisted presentations with code.

## Overview
Slidebook is a developer-friendly tool for creating and running slideshows using JSX, Tailwind, and motion — with built-in live preview, collaboration, theming, and more.

It consists of four packages:

| Package              | Description                                                              |
|----------------------|--------------------------------------------------------------------------|
| @slidebook/cli       | CLI tool to develop, build, run, or eject a Slidebook project.           |
| @slidebook/core      | Internal logic and components — embed slides, manage layout, sync state. |
| @slidebook/image     | A ready-to-use version of Slidebook without custom coding.               |
| @slidebook/server    | Real-time collaboration server — slide syncing, remote control, etc.     |

## Modes of Operation

### 🟢 Simplified Mode

Zero configuration needed. Just create a `slides/` folder and drop in your slides:

```
slides/
  1.tsx
  2.tsx
  slide-3.tsx
```

### 🔧 Professional Mode

Offers full control over structure and rendering.

Run:

```bash
slidebook eject
```

This will scaffold a full Next.js app using `@slidebook/core`.

## How to Use

### Commands

```bash
slidebook dev       # Start local server with hot reload
slidebook build     # Build the app
slidebook start     # Run production build
slidebook eject     # Switch to full custom project mode
```

## Recommended Stack

- Tailwind CSS (colors & themes pre-configured)
- Framer Motion
- Next.js features (server components, async data fetching)

> [!NOTE]
> All slides are **React Server Components by default**, so you can fetch data directly inside a slide:
>
> ```tsx
> const data = await db.query("SELECT * FROM ...");
> ```

## Features

- 💡 AI-powered generation of slide content
- 🧠 Live collaboration via @slidebook/server
- 🎨 Themes: Easily switch color schemes
- 📱 Remote control: Open QR code, change theme, navigate on your phone or any other device and control the deck
- 🗒️ Host view: View speaker notes and slides preview
- 🔍 List view: Browse and jump between all slides

## Configuration

Settings can be passed via:

- Environment variable (env)
- CLI argument (arg)
- Config file (config)
- Default fallback (default)

**Priority:** `arg > env > config > default`

### Example `slidebook.config.js`

```ts
// @ts-check

/**
 * @type {import('@slidebook/cli/lib/config').Config}
 */
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

### Full Options

| Key              | config path      | arg              | env var          | Default              |
|------------------|------------------|------------------|------------------|----------------------|
| serverUrl        | app.serverUrl    | --serverUrl      | SERVER_URL       | —                    |
| qrUrl            | app.qrUrl        | --qrUrl          | QR_URL           | —                    |
| port             | app.port         | --port           | PORT             | 3000                 |
| password         | auth.password    | --password       | PASSWORD         | qwerty               |
| width            | slide.width      | --slideWidth     | SLIDE_WIDTH      | 1200                 |
| height           | slide.height     | --slideHeight    | SLIDE_HEIGHT     | 600                  |
| cookiesFlags     | cookies.flags    | --cookiesFlags   | COOKIES_FLAGS    | SameSite=Strict;     |
| authenticate     | auth.authenticate| —                | —                | —                    |
| validate         | auth.validate    | —                | —                | —                    |

## Real-Time Sync

When the host changes a slide, theme, or QR code:

- All connected clients (viewers or other hosts) update instantly.
- QR and theme sync across devices.

## Host View

Shows:

* Current slide
* Next slide
* Speaker notes
* Navigation controls

Requires host password to access. Set via config, CLI, or env ([read more](#configuration)).

## Themes

Add a theme by importing it into `layout.tsx` (pro mode) or `layer.tsx` (simplified mode):

```ts
import "@slidebook/core/lib/assets/themes/pink-neutral.css";
```

Available themes:

- blue-neutral
- blue-slate
- green-neutral
- green-slate
- orange-neutral
- orange-slate
- pink-neutral
- pink-slate

## Project Structure (Pro Mode)

```
.
├── src/
│   ├── app/                       # Next.js app directory
│   │   ├── [[...pathname]]/       # Slide route segment
│   │   │   └── page.tsx           # Renders current slide
│   │   ├── layout.tsx             # App layout with theme and wrapper
│   │   └── globals.css            # Global styles
│   └───slides/                    # Your slides, one file per slide
│       ├── 0.tsx                  # First slide
│       ├── 1.tsx                  # Second slide
│       └── index.tsx              # Optional wrapper for all slides
├── public/                        # Static assets
├── slidebook.config.js            # Config file
└── package.json
```

### Slides segment

```tsx filename="src/app/[[...pathname]]"
import { RootPage } from "@slidebook/core/lib/components/root-page";
import { generateStaticParamsFactory } from "@slidebook/core/lib/lib/generate-static-params";
import { slides } from "../slides";

export const generateStaticParams = generateStaticParamsFactory(slides.length);

export default async function SlidePage({ params }: { params: Promise<{ pathname: string[] }> }) {
    const { pathname } = await params;
    return <RootPage segments={pathname} slides={slides} />;
}
```

### Slides definition

```ts filename="src/slide/index.tsx"
export const slides = [
    { component: Slide1, notes: Notes1 },
    { component: Slide2 },
];
```

### Layout

```tsx filename="src/app/layout.tsx"
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

## Project structure (Simplified Mode)

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

### Slide

```tsx filename="slides/1.tsx"
export const Slide = () => (
    <h1 className="text-4xl font-bold text-center text-white">Hello World</h1>
);

export const Notes = () => (
    <p>Welcome notes for host view</p>
)
```

### Layer

```tsx filename="slides/layer.tsx"
export const Layer = ({ children }) => (
    <div className="p-12">{children}</div>
);
```

## ⚙️ Running the App

You can start the presentation app and server **together** or **separately**.

### ✅ Recommended: Together

```bash
slidebook start
```

Runs both server and editor in one command — enabling:

- Real-time sync across devices
- QR code sharing
- Host view & navigation

> [!TIP]
> Recommended for local use and self-hosting

### 🧩 Alternative: Separate processes

```bash
slidebook start server
slidebook start app
```

Useful if you're deploying to environments like **Vercel**, which **do not support WebSocket or real-time infrastructure**.

> [!IMPORTANT]
> When running separately, pass the server URL to the app
>
> ```js
> // slidebook.config.js
> export default {
>   app: {
>     serverUrl: "https://your-slidebook-server.example.com",
>   },
> };
> ```

## 📦 Deployment

### To static hosts (Vercel, Netlify)

Only the app can be deployed. Real-time features will be unavailable unless the server is deployed separately.

### To self-hosted server (Docker, Fly.io)

Run `slidebook start` or split as needed. Pass `serverUrl` when decoupling.

## Additional

Please consider giving a star if you like it, this motivates the author to continue working on this and other solutions ❤️

Create issues with wishes, ideas, difficulties, etc. All of them will definitely be considered and thought over.

## License

[MIT](https://github.com/alexdln/slidebook)
