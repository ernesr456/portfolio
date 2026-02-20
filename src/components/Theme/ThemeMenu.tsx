'use client'

import { themes } from '@/appData'
import useOutsideClick from '@/hooks/useOutsideClick'
import { CheckIcon, CloseIcon } from '@/utils/icons'
import { useEffect, useState } from 'react'

const ThemeMenu = () => {
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const menuRef = useOutsideClick(() => setShowThemeMenu(false))

  // ✅ Initialize from localStorage (SSR-safe) to avoid missing-deps warning
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') ?? 'dark'
    }
    return 'dark'
  })

  // ✅ Apply theme + persist whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const changeTheme = (nextTheme: string) => {
    setTheme(nextTheme)
  }

  return (
    <div ref={menuRef} className="fixed bottom-4 right-6 z-50 md:bottom-11 md:right-11">
      <div
        onClick={() => setShowThemeMenu((v) => !v)}
        className="bg-neutral cursor-pointer rounded-full p-1.5 md:p-2"
      >
        <div className="bg-primary grid grid-cols-2 place-content-center gap-0.5 rounded-full p-1.5 md:p-2">
          <div className="size-[7px] rounded-bl-full rounded-t-full bg-[#B13753] md:size-[10px]" />
          <div className="size-[7px] rounded-br-full rounded-t-full bg-[#BAA32B] md:size-[10px]" />
          <div className="size-[7px] rounded-b-full rounded-tl-full bg-[#3178C6] md:size-[10px]" />
          <div className="size-[7px] rounded-b-full rounded-tr-full bg-[#50B359] md:size-[10px]" />
        </div>
      </div>

      {showThemeMenu && (
        <div className="bg-secondary animate-fade-in border-border absolute bottom-full right-0 mb-5 space-y-3 rounded-xl border p-3 md:space-y-4 md:p-5">
          <div className="text-primary-content border-border flex items-center justify-between border-b pb-3 md:pb-4">
            <span className="text-sm md:text-base">_select-theme</span>
            <CloseIcon
              onClick={() => setShowThemeMenu(false)}
              className="h-3 w-3 cursor-pointer md:h-4 md:w-4"
            />
          </div>

          {themes.map(({ name, colors }) => {
            const value = name.toLowerCase()
            return (
              <div
                key={name}
                onClick={() => changeTheme(value)}
                style={{ background: colors[0], color: colors[1] }}
                className="flex min-w-48 cursor-pointer items-center justify-between rounded-lg p-2 md:min-w-60 md:rounded-xl md:p-4"
              >
                <div className="flex items-end gap-1.5">
                  <CheckIcon className={value === theme ? 'block' : 'hidden'} />
                  <span className="text-sm md:text-base">{name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {colors.slice(1).map((color, idx) => (
                    <div
                      key={`${color}-${idx}`}
                      style={{ background: color }}
                      className="size-2 rounded-full md:size-3"
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ThemeMenu