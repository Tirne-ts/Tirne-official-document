'use client'

import { createContext, useState } from 'react'

// 任意のContextをここで作る
export const MyContext = createContext<{ state: null; setState: React.Dispatch<React.SetStateAction<null>> } | null>(null)

export function Providers({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<null>(null)

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  )
}
