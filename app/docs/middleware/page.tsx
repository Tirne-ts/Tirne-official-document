'use client'

import { DocSection } from '@/components/Document/ DocSection'
import { Blockquote } from '@/components/Document/Blockquote'
import { CodeBlock } from '@/components/Document/CodeBlock'
import { Callout } from '@/components/Document/Callout'

export default function MiddlewarePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">

      <DocSection title="🧩 What is Middleware in Tirne?">
        <p>
          In Tirne, <span className="font-semibold text-gray-900 dark:text-white">middleware</span> is a first‑class, type‑safe function that runs before your route’s handler. It’s not global glue — it’s structured logic.
        </p>
        <Blockquote>
          Think of middleware not as an afterthought, but as an intentional composition unit.
        </Blockquote>
      </DocSection>

      <DocSection title="🛠️ Basic Middleware Example">
        <CodeBlock language="ts">{`import type { Middleware } from "tirne";

const logger: Middleware = async (req, next) => {
  const start = Date.now();
  const res = await next();
  console.log(\`[\${req.method}] \${req.url} - \${Date.now() - start}ms\`);
  return res;
};`}</CodeBlock>
        <Callout type="info">
          Middleware has the signature <code>(req, next) =&gt; Promise&lt;Response&gt;</code> — and is fully typed.
        </Callout>
      </DocSection>

      <DocSection title="🏗️ Using Middleware (Global)">
        <CodeBlock language="ts">{`const server = new Server(routes);
server.use(logger); // applies to all routes`}</CodeBlock>
        <p>
          This pattern is useful for logging, auth enforcement, or metrics collection across all endpoints.
        </p>
      </DocSection>

      <DocSection title="🧬 Scoped Middleware (Per Route)">
        <CodeBlock language="ts">{`const routes: Route[] = [
  {
    method: "GET",
    path: "/admin",
    handler: () => new Response("Welcome, admin"),
    middleware: [requireAuth], // only applies here
  }
];`}</CodeBlock>
        <Callout type="tip">
          You can mix global and route‑scoped middleware. Tirne composes them in order — no surprises.
        </Callout>
      </DocSection>

      <DocSection title="🧪 Middleware Stack (Execution Flow)">
        <p>
          Tirne runs middleware <em>in order</em>, from global to local:
        </p>
        <ul className="list-disc list-inside">
          <li>Global <code>server.use()</code> middleware first</li>
          <li>Then, route‑specific middleware (if any)</li>
          <li>Finally, the route’s <code>handler</code></li>
        </ul>
        <Callout type="warning">
          Middleware must call <code>await next()</code> — or the handler won’t run.
        </Callout>
      </DocSection>

      <DocSection title="🔐 Common Middleware Use Cases">
        <ul className="list-disc list-inside">
          <li><strong>Logging</strong> (request time, status)</li>
          <li><strong>Authentication</strong> (token, cookies)</li>
          <li><strong>Rate Limiting</strong> or <strong>CORS</strong></li>
          <li><strong>Header Injection</strong> (e.g. security headers)</li>
        </ul>
      </DocSection>

      <DocSection title="📎 Summary">
        <p>
          Tirne gives you middleware that is:
        </p>
        <ul className="list-disc list-inside">
          <li>💡 <strong>Explicit</strong> — always visible, always structured</li>
          <li>⚙️ <strong>Composable</strong> — easily reused, fully typed</li>
          <li>🧪 <strong>Predictable</strong> — runs in the order you write it</li>
        </ul>
        <Blockquote>
          Middleware in Tirne isn’t a “plugin system” — it’s a clean execution model.
        </Blockquote>
      </DocSection>


    </div>
  )
}
