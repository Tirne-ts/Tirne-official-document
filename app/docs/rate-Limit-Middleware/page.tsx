'use client'

import React from 'react'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"


export default function RateLimitMiddlewarePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DocSection title="🚦 Rate Limit Middleware " subtitle='Prevent Abuse & Overload'>
        <p>
          This example demonstrates how to apply a simple <strong>rate-limiting middleware</strong> using <code>rateLimit()</code>. It limits each client to a maximum number of requests per time window.
        </p>
        <Blockquote>
          Helps protect your API from spamming, scraping, and denial-of-service attacks.
        </Blockquote>
      </DocSection>

      <DocSection title="🔧 Example Code">
        <CodeBlock language="ts">{`import { Server, json, rateLimit} from "tirne";
import type { Route } from "tirne";

const limiter = rateLimit({
  windowMs: 60_000, // 1 minute window
  max: 5,           // limit each client to 5 requests per window
});

const routes: Route[] = [
  {
    method: "GET",
    path: "/limited",
    handler: () => json({ message: "You are within rate limit!" }),
    middleware: [limiter],
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>

      <DocSection title="🧪 Functionality Check">
        <p>Test the rate-limited endpoint using <code>curl</code> repeatedly:</p>

        <h3 className="mt-6 mb-2 font-semibold">1. ✅ First 5 Requests (within 1 minute)</h3>
        <CodeBlock language="bash">{`curl http://localhost:3000/limited`}</CodeBlock>
        <CodeBlock language="json">{`{ "message": "You are within rate limit!" }`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">2. ❌ 6th Request Within the Same Minute</h3>
        <CodeBlock language="json">{`{
  "error": "rate_limit",
  "message": "Too many requests"
}`}</CodeBlock>
      </DocSection>
    </div>
  )
}
