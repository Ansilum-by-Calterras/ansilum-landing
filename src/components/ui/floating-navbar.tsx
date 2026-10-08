'use client'
import { cn } from '@/lib/utils'
import { useToggleStore } from '@/store/useToggleStore'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '../logo'

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const { scrollY } = useScroll()

  const { isOpen, setIsOpen } = useToggleStore()
  const [visible, setVisible] = useState(false)
  const [navbar, setNavbar] = useState(false)

  const showThreshold = 100

  const handleToggle = () => {
    setIsOpen(!isOpen) // Toggle the state in the store
  }

  const handleClick = async () => {
    setNavbar(false)
  }

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (current > showThreshold) {
      setVisible(true)
    } else if (current <= 0) {
      setVisible(false)
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-[85%] items-center justify-between gap-8 space-x-4 rounded-full border border-transparent bg-white/95 py-2 pl-8 pr-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black lg:max-w-fit',
          className,
        )}
      >
        <Link
          href="/"
          onClick={handleClick}
          className="flex flex-row items-center justify-start gap-2"
        >
          <Logo width={127} height={54} />
        </Link>

        <div className="flex items-center gap-1 px-8 lg:hidden">
          <button
            className="rounded-mdp-2 text-primary outline-none focus:border focus:border-primary"
            aria-label="Hamburger Menu"
            onClick={handleToggle}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <NavigationMenu className="hidden items-center lg:flex">
          <NavigationMenuList className="flex items-center space-y-4 px-8 md:flex-row md:space-x-6 md:space-y-0">
            {navItems.map((link) => (
              <li key={link.link}>
                <NavigationMenuLink
                  className="whitespace-nowrap text-base font-semibold text-slate-500 transition-colors duration-300 hover:scale-[1.10] hover:text-black"
                  href={link.link}
                  onClick={handleClick}
                >
                  {link.name}
                </NavigationMenuLink>
              </li>
            ))}
            <Link href="/contactus">
              <button className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
                <span>Contact Us</span>
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              </button>
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
    </AnimatePresence>
  )
}
