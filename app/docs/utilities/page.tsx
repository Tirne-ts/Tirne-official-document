'use client'

import React from 'react'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"

export default function UtilitiesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DocSection title="🧰 Utilities"subtitle='Minimal API Helpers'>
        <p>
          Tirne doesn&apos;t ship batteries-included utilities — but writing them is trivial. Here are <strong>4 tiny but powerful functions</strong> to help you build faster.
        </p>
        <Blockquote>
          <strong>json()</strong>, <strong>redirect()</strong>, <strong>parseQuery()</strong>, <strong>parseBody()</strong> — that&apos;s all you need to simplify responses.
        </Blockquote>
      </DocSection>

      <DocSection title="1. json() — JSON Response Helper">
        <CodeBlock language="ts">{`export function json(data: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}`}</CodeBlock>
        <CodeBlock language="ts">{`handler: () => json({ hello: "world" })`}</CodeBlock>
      </DocSection>

      <DocSection title="2. redirect() — Simple Redirect Response">
        <CodeBlock language="ts">{`export function redirect(location: string, status: 302 | 301 = 302) {
  return new Response(null, {
    status,
    headers: {
      Location: location,
    },
  });
}`}</CodeBlock>
        <CodeBlock language="ts">{`handler: () => redirect("/login")`}</CodeBlock>
      </DocSection>

      <DocSection title="3. parseQuery() — Easy Access to Query Params">
        <CodeBlock language="ts">{`export function parseQuery(req: Request): URLSearchParams {
  return new URL(req.url).searchParams;
}`}</CodeBlock>
        <CodeBlock language="ts">{`const query = parseQuery(req);
const q = query.get("q");`}</CodeBlock>
      </DocSection>

      <DocSection title="4. parseBody() — Safe Body Parsing">
        <CodeBlock language="ts">{`export async function parseBody(req: Request): Promise<unknown> {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await req.json();
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    return Object.fromEntries(new URLSearchParams(text));
  }
  return await req.text(); // fallback
}`}</CodeBlock>
      </DocSection>

      
      <DocSection title="✨ Example: All Together">
        <CodeBlock language="ts">{`import type { Route } from "tirne";
import { Server, json, redirect, parseQuery, parseBody } from "tirne";

const routes: Route[] = [
  {
    method: "GET",
    path: "/",
    handler: (req) => {
      const name = parseQuery(req).get("name") || "stranger";
      return json({ message: \`Hello, \${name}!\` });
    },
  },
  {
    method: "POST",
    path: "/echo",
    handler: async (req) => {
      const body = await parseBody(req);
      return json({ received: body });
    },
  },
  {
    method: "GET",
    path: "/go",
    handler: () => redirect("/"),
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>
     <DocSection title="✅ Functionality Check (Examples)">
  <p>Try the following <code>curl</code> commands to verify the behavior of each route.</p>

  <h3 className="mt-6 mb-2 font-semibold">1. Access<code>/</code></h3>
  <CodeBlock language="bash">{`curl http://localhost:3000/`}</CodeBlock>
  <CodeBlock language="json">{`{ "message": "Hello, stranger!" }`}</CodeBlock>

  <h3 className="mt-6 mb-2 font-semibold">2. POST to<code>/echo</code></h3>
  <CodeBlock language="bash">{`curl -X POST http://localhost:3000/echo -H "Content-Type: application/json" -d '{"msg":"hi"}'`}</CodeBlock>
  <CodeBlock language="json">{`{ "received": { "msg": "hi" } }`}</CodeBlock>

  <h3 className="mt-6 mb-2 font-semibold">3. Access<code>/go</code></h3>
  <CodeBlock language="bash">{`curl -i http://localhost:3000/go`}</CodeBlock>
  <CodeBlock language="http">{`HTTP/1.1 302 Found
Location: /`}</CodeBlock>
</DocSection>


    </div>
  )
}
