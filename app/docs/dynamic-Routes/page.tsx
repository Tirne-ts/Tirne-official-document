'use client'

import React from 'react'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"
export const dynamic = 'force-static' // ← 完全SSG指定（Cloudflare向け）


export default function DynamicRoutesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DocSection title="🧭 Dynamic & Wildcard Routes in Tirne">
        <p>
          This example demonstrates how to use <strong>dynamic parameters</strong> (e.g., <code>:id</code>) and <strong>wildcard splats</strong> (e.g., <code>*</code>) in your route definitions with <code>tirne</code>.
        </p>
        <Blockquote>
          Match dynamic paths like <code>/user/:id</code> or <code>/blog/*</code> and access the values through the <code>params</code> argument.
        </Blockquote>
      </DocSection>

      <DocSection title="🔧 Example Code">
        <CodeBlock language="ts">{`import { Server, json } from "tirne";
import type { Route } from "tirne";

const routes: Route[] = [
  {
    method: "GET",
    path: "/user/:id",
    handler: (req, params) => {
      return json({ userId: params?.id });
    },
  },
  {
    method: "GET",
    path: "/blog/*",
    handler: (req, params) => {
      return json({ path: params?.["*"] });
    },
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>

      <DocSection title="🧪 Functionality Check">
        <p>Try these curl commands to verify dynamic and wildcard routing:</p>

        <h3 className="mt-6 mb-2 font-semibold">1. ✅ Access <code>/user/123</code></h3>
        <CodeBlock language="bash">{`curl http://localhost:3000/user/123`}</CodeBlock>
        <CodeBlock language="json">{`{ "userId": "123" }`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">2. ✅ Access <code>/blog/2025/06/tech/startup</code></h3>
        <CodeBlock language="bash">{`curl http://localhost:3000/blog/2025/06/tech/startup`}</CodeBlock>
        <CodeBlock language="json">{`{ "path": "2025/06/tech/startup" }`}</CodeBlock>
      </DocSection>
    </div>
  )
}
