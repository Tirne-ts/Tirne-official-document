'use client'

import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"
import { Callout } from "../../../components/Document/Callout"
import React from 'react'
import { NextPrevNav } from "@/components/Document/NextPrevNav"

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">

      <DocSection title="❗️ Errors in Tirne are Intentional">
        <p>
          In Tirne, you don’t <em>catch</em> errors — you <strong>design</strong> them.
          The <code>TirneError</code> class lets you define errors with status, type, and visibility.
        </p>
        <Blockquote>
          ✅ Think of errors as typed responses, not thrown chaos.
        </Blockquote>
      </DocSection>

      <DocSection title="🧪 Basic TirneError Example">
        <CodeBlock language="ts">{`import { TirneError } from "tirne";

throw new TirneError("Missing name", {
  status: 400,
  type: "bad_request",
  expose: true
});`}</CodeBlock>
        <Callout type="info">
          <code>status</code> defines HTTP response code.<br />
          <code>type</code> defines error semantics.<br />
          <code>expose</code> controls whether it is shown to the client.
        </Callout>
      </DocSection>

      <DocSection title="📂 Full Example with Error">
        <CodeBlock language="ts">{`import { Server, TirneError } from "tirne";
import type { Route } from "tirne";

const routes: Route[] = [
  {
    method: "GET",
    path: "/",
    handler: (req) => {
      const name = new URL(req.url).searchParams.get("name");
      if (!name) {
        throw new TirneError("Missing name", {
          status: 400,
          type: "bad_request",
          expose: true,
        });
      }
      return new Response(\`Hello, \${name}\`);
    },
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
        <Callout type="warning">
          No need for <code>try/catch</code> or <code>use()</code> — Tirne automatically handles <code>TirneError</code> as part of the middleware stack.
        </Callout>
      </DocSection>

      <DocSection title="🔍 What Happens Under the Hood?">
        <ul className="list-disc list-inside">
          <li>Uncaught <code>TirneError</code> is converted into a <code>Response</code></li>
          <li><code>status</code> and <code>type</code> are included in the JSON body</li>
          <li>If <code>expose</code> is false, error message is omitted</li>
        </ul>
        <Callout type="tip">
          Errors are serialized into structured JSON: <code>{`{ type, status, message }`}</code>
        </Callout>
      </DocSection>

      <DocSection title="🔒 Use Case: Safe API Design">
        <p>
          This model is ideal for:
        </p>
        <ul className="list-disc list-inside">
          <li>Form validation errors</li>
          <li>Auth / permission rejections</li>
          <li>Data contract violations</li>
        </ul>
        <Blockquote>
          You don&apos;t “handle” errors — you **declare** them.
        </Blockquote>
      </DocSection>
      <NextPrevNav />

    </div>
  )
}
