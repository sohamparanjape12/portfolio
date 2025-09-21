"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  // Prevent transition flash when mounting
  React.useEffect(() => {
    const html = document.documentElement
    html.classList.add('disable-transitions')
    setMounted(true)
    
    // Remove the disable-transitions class after mounting
    requestAnimationFrame(() => {
      html.classList.remove('disable-transitions')
    })
  }, [])

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}