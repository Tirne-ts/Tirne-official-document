'use client'

import React from 'react'
import { DocSection } from "../../../components/Document/ DocSection"
import { CodeBlock } from "../../../components/Document/CodeBlock"
import { Blockquote } from "../../../components/Document/Blockquote"


export default function AuthMiddlewarePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <DocSection title="🔐 Auth Middleware" subtitle='Token Validation via Cookie or Header'>
        <p>
          This example shows how to protect routes using a custom <code>createAuth()</code> middleware.
          After logging in via <code>/login</code>, the server sets a JWT token as a cookie. You can also send the token manually using an <code>Authorization</code> header.
        </p>
        <Blockquote>
          Token-based auth with cookie fallback — secure, flexible, and extensible.
        </Blockquote>
      </DocSection>

      <DocSection title="🔧 Example Code">
        <CodeBlock language="ts">{`import type { Route } from "tirne";
import { Server,createAuth,json,generateToken,setCookie } from "tirne";


const SECRET = "super-secret-key";

const routes: Route[] = [
  {
    method: "POST",
    path: "/login",
    handler: async (req) => {
      const token = await generateToken({
        id: "user123",
        role: "admin",
        iat: Date.now(),
        jti: crypto.randomUUID(),
      }, SECRET);
      const headers = new Headers();
      headers.set("Set-Cookie", setCookie("auth", token, {
        httpOnly: true,
        path: "/",
        maxAge: 3600,
      }));
      return json({ token }, 200, headers);
    },
  },
  {
    method: "GET",
    path: "/me",
    handler: (req) => {
      const user = (req as any).user;
      return json({ user });
    },
    middleware: [createAuth({ secret: SECRET })],
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`}</CodeBlock>
      </DocSection>

      <DocSection title="🧪 How to Test Authentication">
        <p>Try the following steps to validate token-based authentication:</p>

        <h3 className="mt-6 mb-2 font-semibold">1. 🔐 Log in and Get Token</h3>
        <CodeBlock language="bash">{`curl -X POST http://localhost:3000/login -i`}</CodeBlock>
        <CodeBlock language="http">{`HTTP/1.1 200 OK
Set-Cookie: auth=eyJpZCI6...; HttpOnly`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">2. ✅ Access /me with Cookie</h3>
        <CodeBlock language="bash">{`curl --cookie "auth=<your-token-here>" http://localhost:3000/me`}</CodeBlock>
        <CodeBlock language="json">{`{
  "user": {
    "id": "user123",
    "role": "admin"
  }
}`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">3. ✅ Access /me with Authorization Header</h3>
        <CodeBlock language="bash">{`curl -H "Authorization: Bearer <your-token-here>" http://localhost:3000/me`}</CodeBlock>

        <h3 className="mt-6 mb-2 font-semibold">4. ❌ Access /me without Token</h3>
        <CodeBlock language="bash">{`curl http://localhost:3000/me`}</CodeBlock>
        <CodeBlock language="json">{`{
  "error": "unauthorized",
  "message": "Unauthorized"
}`}</CodeBlock>
      </DocSection>
    </div>
  )
}
