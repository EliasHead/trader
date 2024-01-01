'use client'

import { useState } from 'react'
import { NavbarArray } from '@/utils/NavbarArrayAndTypes'
import Link from 'next/link'
import { List, X } from '@phosphor-icons/react'
import { NavItem } from './nav-item'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNav = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed left-0 top-0 z-10 w-full bg-primary duration-300 ease-in">
      <div className="m-auto flex max-w-[1240px] items-center justify-between p-4 text-white">
        <Link href="/">
          <div className="mr-6 flex flex-shrink-0 items-center text-white">
            <svg
              className="mr-2 h-8 w-8 fill-current"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="text-xl font-semibold tracking-tight">Trader</span>
          </div>
        </Link>

        <ul className="hidden sm:flex">
          {NavbarArray.map((item) => {
            return (
              <li className="px-4" key={item.label}>
                <NavItem href={item.href} label={item.label}/>
              </li>
            )
          })}
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="z-10 block sm:hidden">
          {isOpen ? (
            <X size={24} color="#fafafa" weight="bold" />
          ) : (
            <List size={24} color="#ffffff" weight="bold" />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            isOpen
              ? 'absolute bottom-0 left-0 right-0 top-0 flex h-screen w-full items-center justify-center bg-teal-500 text-center duration-300 ease-in sm:hidden'
              : 'absolute bottom-0 left-[-100%] right-0 top-0 flex h-screen w-full items-center justify-center bg-teal-500 text-center duration-300 ease-in sm:hidden'
          }
        >
          <ul>
            {NavbarArray.map((item) => {
              return (
                <li
                  onClick={handleNav}
                  className="p-4 text-4xl hover:text-gray-500"
                  key={item.label}
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
