'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className="size-12 lg:size-9" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex size-12 items-center justify-center rounded-lg text-gray-950 transition data-[hover]:bg-black/5 lg:size-9 lg:rounded-md dark:text-white dark:data-[hover]:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </button>
  )
}
