'use client'

import React from 'react'

export default function IntroductionPage() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto py-12 px-4">
      <h2>🧭 Introduction — What is <em>Tirne</em>?</h2>
      <p>
        <strong>Tirne</strong> is a minimal, type-safe web framework for <em>multi-runtime edge environments</em> — born for Bun, Workers, and Deno. Unlike traditional backend frameworks, Tirne treats <strong>structure as the source of truth</strong>, and <strong>side effects as first-class citizens</strong>.
      </p>
      <blockquote>
        ✨ <strong>Declarative APIs. Sub-millisecond performance. Zero boilerplate.</strong>
      </blockquote>
      <p>
        Whether you&apos;re building latency-critical APIs or designing strongly typed systems, Tirne puts control, clarity, and composition back in your hands.
      </p>

      <hr />

      <h2>🎯 Why Tirne Exists</h2>
      <p>
        Modern web frameworks often prioritize <em>developer convenience</em> at the cost of <em>architectural clarity</em>. In particular, frameworks like <strong>Hono</strong> and <strong>Next.js API Routes</strong> have popularized a model where behavior is implied — not defined.
      </p>

      <h3>🧨 The Problem With &quot;Implicit Backends&quot;</h3>
      <ul>
        <li>In <strong>Hono</strong>, middleware is often attached globally via <code>app.use()</code> — making it unclear what logic applies to which route.</li>
        <li><strong>Next.js API routes</strong> bury behavior in isolated <code>pages/api/*.ts</code> files, often relying on filesystem conventions and hidden assumptions about request context, cookies, and auth.</li>
        <li>Side effects — setting headers, mutating cookies, or throwing errors — often occur <em>without visibility or contract</em>. There&apos;s no traceable structure.</li>
      </ul>
      <p>
        This leads to a backend that works in development — but collapses under complexity:
      </p>
      <ul>
        <li>Hard to audit for security</li>
        <li>Impossible to predict performance under load</li>
        <li>Error handling becomes an afterthought, not a design</li>
      </ul>
      <p>
        Tirne is born from frustration with these approaches. It is an answer to the invisible glue that holds many modern frameworks together — and breaks silently when you scale.
      </p>

      <hr />

      <h2>🧱 Designed for the Edge — Built for Builders</h2>
      <p>Tirne is ideal for:</p>
      <ul>
        <li><strong>Edge-native apps</strong> where cold start ≠ startup time</li>
        <li><strong>Type-driven API design</strong>, not runtime inference</li>
        <li><strong>Security-critical flows</strong> where headers, cookies, and auth must be controlled explicitly</li>
        <li><strong>Minimalists</strong> who want to ship without scaffolding, magic, or noise</li>
      </ul>
      <p>
        In essence, Tirne is not trying to be the next Express.  
        It’s trying to be the backend that finally feels like modern frontend:
      </p>
      <blockquote><em>Declarative. Composable. Fast.</em></blockquote>

      <hr />

      <h2>🛠️ How Tirne Works — A Manifest, Not a Script</h2>
      <p>Tirne follows five design laws:</p>
      <ol>
        <li><strong>Structure is the source of truth</strong>: APIs are defined as code, not behavior. No decorators, no conventions — just configuration you can read.</li>
        <li><strong>Errors are data, not chaos</strong>: Exceptions carry type, status, and visibility. You don’t catch them — you design them.</li>
        <li><strong>Composition is everything</strong>: Middleware is composed explicitly. No global state, no stack traces from hell.</li>
        <li><strong>Built for the edge, shaped by types</strong>: Tirne runs instantly on Bun, Workers, and Deno. And your types shape what runs — not your docs.</li>
        <li><strong>No bootstraps, no boilerplate, no BS</strong>: One file. No CLI. No hidden magic. What you write is what you deploy.</li>
      </ol>

      <hr />

      <h2>⚔️ Tirne vs Hono vs Next.js — Why We Must Be Explicit</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Tirne</th>
            <th>Hono</th>
            <th>Next.js API Routes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Routing</strong></td>
            <td>Declarative <code>Route[]</code> structure</td>
            <td>Chain-style <code>app.get()</code></td>
            <td>Filesystem-based magic</td>
          </tr>
          <tr>
            <td><strong>Middleware</strong></td>
            <td>Scoped per-route, explicit</td>
            <td>Global <code>use()</code> by default</td>
            <td>None or ad hoc</td>
          </tr>
          <tr>
            <td><strong>Side Effects</strong></td>
            <td>Controlled, typed, visible</td>
            <td>Implicit via handler body</td>
            <td>Scattered across file trees</td>
          </tr>
          <tr>
            <td><strong>Error Handling</strong></td>
            <td><code>TirneError</code> with metadata</td>
            <td><code>throw</code> or context mutation</td>
            <td><code>res.status(500)</code> manually</td>
          </tr>
          <tr>
            <td><strong>Type Safety</strong></td>
            <td>First-class</td>
            <td>Medium, context-specific</td>
            <td>Weak, manual inference</td>
          </tr>
        </tbody>
      </table>
      <blockquote>
        Tirne exists because the modern backend deserves <em>intention</em>, not implication.
      </blockquote>

      <hr />

      <h2>🧪 Real Code. Real Performance. No Magic.</h2>
      <pre>
        <code className="language-ts">
{`import { Server, json, setCookie, requireAuth } from "tirne";
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
};`}
        </code>
      </pre>

      <hr />

      <h2>💬 Elevator Pitch</h2>
      <blockquote>
        <strong>Tirne is a zero-boilerplate, edge-native web framework where your routes are code, your errors are typed, and your side effects are intentional.</strong>
      </blockquote>
      <p>
        If you’re tired of magical frameworks that hide too much and explain too little — welcome home.
      </p>
      <p>
        👉 <a href="https://github.com/Tirne-ts/Tirne">https://github.com/Tirne-ts/Tirne</a>
      </p>
    </div>
  )
}
