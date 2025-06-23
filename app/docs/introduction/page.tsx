
'use client'

import { DocSection } from '@/components/Document/ DocSection'
import { Blockquote } from '@/components/Document/Blockquote'
import { FeatureTable } from '@/components/Document/FeatureTable'
import { CodeBlock } from '@/components/Document/CodeBlock'
import { Callout } from '@/components/Document/Callout'
export default function IntroductionPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      {/* セクション 1 */}
      <DocSection title="What is Tirne?" subtitle=''>
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">Tirne</span> is a minimal, type‑safe web framework for <em>multi‑runtime edge environments</em> — born for Bun, Workers, and Deno. Unlike traditional backend frameworks, Tirne treats <span className="font-semibold">structure as the source of truth</span>, and <span className="font-semibold">side effects as first‑class citizens</span>.
        </p>

        <Blockquote>
          ✨ Declarative APIs. Sub‑millisecond performance. Zero boilerplate.
        </Blockquote>

        <p>
          Whether you&apos;re building latency‑critical APIs or designing strongly‑typed systems, Tirne puts control, clarity, and composition back in your hands.
        </p>
      </DocSection>

      {/* セクション 2 */}
      <DocSection title="🎯 Why Tirne Exists">
        <p>
          Modern web frameworks often prioritize <em>developer convenience</em> at the cost of <em>architectural clarity</em>. In particular, frameworks like <span className="font-semibold">Hono</span> and <span className="font-semibold">Next.js API Routes</span> popularize behavior that is implied, not defined.
        </p>

        <Callout type="warning" title="🧨 The Problem With 'Implicit Backends'">
          <ul className="list-disc list-inside">
            <li>Hono uses global middleware via <code>app.use()</code>, obscuring scope of logic.</li>
            <li>Next.js relies on isolated files and hidden conventions for context, cookies, auth.</li>
            <li>Side effects happen without visibility or contract—no structure, no trace.</li>
          </ul>
        </Callout>

        <p>This leads to:</p>
        <ul className="list-disc list-inside">
          <li>Hard‑to‑audit security</li>
          <li>Unpredictable performance under load</li>
          <li>Error handling as an afterthought</li>
        </ul>

        <p>Tirne exists to break free from this invisible glue.</p>
      </DocSection>

      {/* セクション 3: 比較表 */}
      <DocSection title="⚔️ Tirne vs Hono vs Next.js — Why We Must Be Explicit">
        <FeatureTable
          rows={[
            {
              feature: 'Routing',
              tirne: 'Declarative <code>Route[]</code> structure',
              hono: 'Chain‑style <code>app.get()</code>',
              next: 'Filesystem magic',
            },
            {
              feature: 'Middleware',
              tirne: 'Scoped per‑route',
              hono: 'Global <code>use()</code> by default',
              next: 'None or ad hoc',
            },
            {
              feature: 'Side Effects',
              tirne: 'Controlled, typed, visible',
              hono: 'Implicit via handler body',
              next: 'Scattered across files',
            },
            {
              feature: 'Error Handling',
              tirne: '<code>TirneError</code> with metadata',
              hono: 'throw or context mutation',
              next: 'res.status(500) manually',
            },
            {
              feature: 'Type Safety',
              tirne: 'First‑class',
              hono: 'Medium, context‑specific',
              next: 'Weak, manual inference',
            },
          ]}
        />

        <Blockquote>
          Tirne exists because the modern backend deserves <em>intention</em>, not implication.
        </Blockquote>
      </DocSection>

      {/* セクション 4: コード */}
      <DocSection title="🧪 Real Code. Real Performance. No Magic.">
        <CodeBlock language="ts">{`import { Server, json, setCookie, requireAuth } from "tirne";
import type { Route } from "tirne";

const routes: Route[] = [
  {
    method: "GET",
    path: "/login",
    handler: () => {
      const headers = new Headers();
      headers.append("Set-Cookie", setCookie("auth", "valid-token", {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
      }));
      return json({ message: "Logged in" }, 200, headers);
    },
    middleware: [],
  },
  {
    method: "GET",
    path: "/private",
    handler: () => json({ message: "Secret data only for authenticated users" }),
    middleware: [requireAuth],
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>

      {/* セクション 5: エレベーターピッチ */}
      <DocSection title="💬 Elevator Pitch">
        <Callout type="tip">
          <p>
            <span className="font-semibold">
              Tirne is a zero‑boilerplate, edge‑native web framework where your routes are code, your errors are typed, and your side effects are intentional.
            </span>{' '}
            If you’re tired of magical frameworks that hide too much and explain too little — welcome home.
          </p>
          <p>
            👉{' '}
            <a
              href="https://github.com/Tirne-ts/Tirne"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              https://github.com/Tirne‑ts/Tirne
            </a>
          </p>
        </Callout>
      </DocSection>


    </div>
  )
}