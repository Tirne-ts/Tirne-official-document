// lib/getDocsList.ts
import fs from 'fs'
import path from 'path'

export function getDocsList(): string[] {
  try {
    const docsDir = path.join(process.cwd(), 'app/docs')
    return fs
      .readdirSync(docsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort()
  } catch (e) {
    console.error('Failed to read docs directory:', e)
    return []
  }
}
