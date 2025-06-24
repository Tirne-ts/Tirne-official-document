'use client'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { FeatureTable } from "../../../components/Document/FeatureTable"
import { Blockquote } from "../../../components/Document/Blockquote"
import { Callout } from "../../../components/Document/Callout"
import React from 'react'
export const dynamic = 'force-static' // ← 完全SSG指定（Cloudflare向け）



export default function GettingStartedPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      
      <DocSection title="🚀 Hello, Tirne!">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Tirne</span> is a zero‑boilerplate, edge‑native framework for Bun, Workers, and Deno — built for speed, structure, and simplicity.
        </p>
        <Blockquote>
          ✨ <span className="font-semibold">Sub‑millisecond APIs, typed routes, no magic. Just code.</span>
        </Blockquote>
      </DocSection>

      <DocSection title="🛠️ 1. Quick Start">
        <CodeBlock language="bash">{`npx create-tirne-app
✔ Choose your target environment › Bun / Workers
✔ Project folder … my‑tirne‑app

cd my‑tirne‑app
bun install
npm run dev or wrangler dev`}</CodeBlock>
        <Callout type="info">
          Your API will be available at <code>http://localhost:3000</code>.
        </Callout>
      </DocSection>

      <DocSection title="📁 Project Structure">
        <ul className="list-disc list-inside">
          <li><code>index.ts</code> — Entry point using fetch interface</li>
          <li><code>package.json</code> — Bun / Workers ready</li>
          <li><code>tsconfig.json</code> — Minimal, strict</li>
        </ul>
      </DocSection>

      <DocSection title="⚡️ 2. Performance Benchmarks">
        <FeatureTable
          rows={[
            {
              feature: 'Cold Start',
              tirne: '0.02 ms',
              hono: '300 ms',
              next: '500 ms+',
            },
            {
              feature: 'First Request',
              tirne: '0.79 ms',
              hono: '20–30 ms',
              next: '50 ms+',
            },
            {
              feature: 'Requests/sec',
              tirne: '90,000+ rps',
              hono: '8,000–10,000 rps',
              next: '5,000 rps',
            },
            {
              feature: 'Avg Latency',
              tirne: '<1 ms',
              hono: '~15 ms+',
              next: '~30 ms',
            },
          ]}
        />
        <Blockquote>
          Tirne is <span className="font-semibold">10× faster</span> than Next.js API Routes — and that’s before tuning.
        </Blockquote>
      </DocSection>

      <DocSection title="📀 3. Hello Tirne (Hello World)">
        <CodeBlock language="ts">{`import { Server } from "tirne";

const server = new Server([
  {
    method: "GET",
    path: "/health",
    handler: () => new Response("✅ OK")
  }
]);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
        <Callout type="tip">
          In Next.js, this would be a full folder in <code>/pages/api/health.ts</code> plus config and global middleware.  
          With Tirne, it’s one file — typed and fast.
        </Callout>
      </DocSection>

      <DocSection title="👉 What’s Next?">
        <ul className="list-disc list-inside">
          <li><a href="/docs/introduction">🔎 Philosophy & Design Goals</a></li>
          <li><a href="/docs/middleware">🧭 Middleware</a></li>
          <li><a href="https://github.com/Tirne-ts/Tirne" target="_blank">⭐ Star Tirne on GitHub</a></li>
        </ul>
      </DocSection>

    </div>
  )
}
