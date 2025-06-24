'use client'

import React from 'react'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"
export const dynamic = 'force-static' // ← 完全SSG指定（Cloudflare向け）

export async function generateMetadata() {
  return {
    title: 'cookieAuth-Middleware | Tirne',
    description: 'Learn how to set up and use cookieAuth-Middleware in Tirne, the zero-boilerplate framework built for Bun, Deno and Workers.',
    keywords: ['Tirne', 'cookieAuth-Middleware', 'Bun framework', 'Cloudflare Workers'],
    openGraph: {
      title: 'cookieAuth-Middleware with Tirne',
      description: 'How to start building with cookieAuth-Middleware in Tirne, the modern edge-native framework.',
      url: 'https://tirne.dev/docs/cookieAuth-Middleware',
    },
  }
}

export default function CookieAuthPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DocSection title="🍪 Cookie-based Authentication with Middleware">
        <p>
          This example shows how to implement simple cookie-based authentication using <code>tirne</code>. We issue a cookie on <code>/login</code> and protect <code>/private</code> using a <strong>per-route middleware</strong>.
        </p>
        <Blockquote>
          Set-Cookie on login, validate via middleware, and keep routes clean.
        </Blockquote>
      </DocSection>

      <DocSection title="🔧 Example Code">
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
    middleware: [], // No auth middleware on /login
  },
  {
    method: "GET",
    path: "/private",
    handler: () => json({ message: "Secret data only for authenticated users" }),
    middleware: [requireAuth], // Protect /private
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>

      <DocSection title="🧪 How to Test">
        <p>Try these curl commands to verify cookie-based behavior:</p>

        <h3 className="mt-6 mb-2 font-semibold">1. 🔓 Access <code>/login</code> (No Auth Required)</h3>
        <CodeBlock language="bash">{`curl -i http://localhost:3000/login`}</CodeBlock>
        <CodeBlock language="http">{`HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: auth=valid-token; Path=/; HttpOnly; Max-Age=3600

{"message":"Logged in"}`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">2. 🔐 Access <code>/private</code> (With Cookie)</h3>
        <CodeBlock language="bash">{`curl -i --cookie "auth=valid-token" http://localhost:3000/private`}</CodeBlock>
        <CodeBlock language="json">{`{"message":"Secret data only for authenticated users"}`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">3. ❌ Access <code>/private</code> (No Cookie)</h3>
        <CodeBlock language="bash">{`curl -i http://localhost:3000/private`}</CodeBlock>
        <CodeBlock language="json">{`{"error":"unauthorized","message":"Unauthorized"}`}</CodeBlock>
      </DocSection>
    </div>
  )
}
