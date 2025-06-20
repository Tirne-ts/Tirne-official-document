'use client'

import { useEffect, useState } from 'react'
import { Hero } from '@/components/ui/Hero'
import { BenchmarkCards } from '@/components/ui/BenchmarkCards'
import { CTA } from '@/components/ui/CTA'
import { CodeTabs } from '@/components/ui/CodeTabs'
import { PhilosophyCards } from '@/components/ui/PhilosophyCards'

export default function Home() {
  const [starCount, setStarCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/Tirne-ts/Tirne')
      .then((res) => res.json())
      .then((data) => setStarCount(data.stargazers_count))
      .catch(() => setStarCount(null))
  }, [])

  return (
    <div className="space-y-6 px-6 md:px-12 py-4">
      <Hero
        title="Tirne"
        subtitle="Structure over boilerplate. Tirne is a zero-boilerplate, Bun and Workers framework."
        starCount={starCount ?? undefined}
        buttons={[
          { label: 'Get Started', href: '/docs/getting-started' },
          { label: 'Star on GitHub', href: 'https://github.com/Tirne-ts/Tirne' },
          { label: 'Documentation', href: '/docs/introduction' }

        ]}
      />

      <CodeTabs
      title="Tirne Code Examples"
        tabs={[
          {
            title: 'Tirne',
            code: `import { Server } from "tirne";
import type { Route } from "tirne";
const routes: Route[] = [
  {
    method: "GET",
    path: "/",
    handler: (req) => new Response("Hello from my framework!"),
  },
];

const server = new Server(routes);

export default {
  fetch: (req: Request) => server.fetch(req),
};`,
            language: 'typescript',
          },
          {
            title: 'Tirne (Middleware)',
            code: `import { Middleware } from "tirne";
const logger: Middleware = async (req, next) => {
  const start = Date.now();
  const res = await next();
  return res;
};`,
            language: 'typescript',
          },
          {
            title: 'Tirne (Error Handling)',
            code: `import type { Route } from "tirne";
import { Server, TirneError } from "tirne";

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
    },
  },
];`,
            language: 'typescript',
          },
        ]}
      />

      <BenchmarkCards
        title="Tirne Performance"
        stats={[
          {
            label: 'Cold Start',
            value: '0.02',
            emoji: '❄️',
            description: '0.02 ms. No delay. No compromise. The cold start crown is ours.',
            highlight: true,
            unit: 'ms',
          },
          {
            label: 'Requests/sec',
            value: '90,489',
            emoji: '⚡️',
            description: 'Built for flash traffic — no warmup needed.',
            unit: 'rps',
          },
          {
            label: 'Avg Latency',
            value: '0.96',
            unit: 'ms',
            emoji: '📉',
            description: 'Snappy under pressure. Always.',
          },
          {
            label: 'Total Requests (10s)',
            value: '905,000',
            unit: 'req / 10s',
            emoji: '🎯',
            description: 'Served 905,000 in 10s. Edge-scale, real load.',
          },
        ]}
      />

      <PhilosophyCards
        title="Tirne Philosophy"
        items={[
          {
            title: 'Structure is Truth',
            desc: 'APIs are defined as code, not behavior. No decorators or magic.',
          },
          {
            title: 'Errors are Data',
            desc: 'Errors include status, type, and visibility. Not chaos—contracts.',
          },
          {
            title: 'Composition Matters',
            desc: 'Middleware is ordered and scoped. No global leaks.',
          },
          {
            title: 'Edge-Native by Default',
            desc: 'Runs natively on Bun, Workers, Deno — no cold start surprises.',
          },
          {
            title: 'No Boilerplate',
            desc: 'No CLI, no config folders. Just code you own and understand.',
          },
        ]}
      />

      <CTA
        title="Ready to write real code again?"
        subtitle="Create your Tirne app in seconds. No boilerplate, no black box."
        buttons={[
          { label: 'npx create-tirne-app', href: '/docs/getting-started' },
          { label: 'GitHub →', href: 'https://github.com/Tirne-ts/Tirne' },
        ]}
      />
    </div>
  )
}
