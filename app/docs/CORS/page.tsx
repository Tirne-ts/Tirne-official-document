'use client'

import React from 'react'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"

export default function CORSMiddlewarePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DocSection title="🌐 CORS Middleware "subtitle='Cross-Origin Resource Sharing'>
        <p>
          This example shows how to enable CORS for specific origins using <code>createCORS()</code>. It handles both standard and preflight requests for secure and compliant cross-origin API access.
        </p>
        <Blockquote>
          Whitelist trusted domains, enable credentials, and allow required headers and methods.
        </Blockquote>
      </DocSection>

      <DocSection title="🔧 Example Code">
        <CodeBlock language="ts">{`import { Server, Route } from "./src/server";
import { json } from "./src/util";
import { createCORS } from "./src/middleware/cors";

const cors = createCORS({
  origin: ["https://example.com", "https://admin.example.com"],
  credentials: true,
  headers: ["Content-Type", "Authorization"],
  methods: ["GET", "POST"],
  maxAge: 86400, // cache preflight for 1 day
});

const routes: Route[] = [
  {
    method: "GET",
    path: "/data",
    handler: () => json({ message: "Hello with CORS" }),
  },
];

const server = new Server(routes);
server.use(cors); // global middleware

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>

      <DocSection title="🧪 Functionality Check">
        <p>Test CORS behavior with the following <code>curl</code> commands:</p>

        <h3 className="mt-6 mb-2 font-semibold">1. ✅ Simple Request from Allowed Origin</h3>
        <CodeBlock language="bash">{`curl -i -H "Origin: https://example.com" http://localhost:3000/data`}</CodeBlock>
        <CodeBlock language="http">{`HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Credentials: true
Content-Type: application/json

{"message":"Hello with CORS"}`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">2. ✅ Preflight Request (OPTIONS)</h3>
        <CodeBlock language="bash">{`curl -i -X OPTIONS http://localhost:3000/data \\
  -H "Origin: https://example.com" \\
  -H "Access-Control-Request-Method: POST"`}</CodeBlock>
        <CodeBlock language="http">{`HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET,POST
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400`}</CodeBlock>
      </DocSection>
    </div>
  )
}
