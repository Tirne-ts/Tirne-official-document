'use client'

interface Row {
  feature: string
  tirne: string
  hono: string
  next?: string
}

export function FeatureTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="w-full text-sm text-left table-auto border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
          <tr>
            <th className="px-4 py-2">Feature</th>
            <th className="px-4 py-2">Tirne</th>
            <th className="px-4 py-2">Hono</th>
            <th className="px-4 py-2">Next.js</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
            >
              <td className="px-4 py-2 font-medium">{r.feature}</td>
              <td className="px-4 py-2">{r.tirne}</td>
              <td className="px-4 py-2">{r.hono}</td>
              <td className="px-4 py-2">{r.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
