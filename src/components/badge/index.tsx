'use client'

import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

type BadgeProps = ComponentProps<typeof motion.span> & {
  name: string
  textColor?: string
  bg?: string 
}

export const Badge = ({ name, textColor, bg='bg-emerald-900/80', ...props }: BadgeProps) => {
  return (
    <motion.span
      className={`${textColor} ${bg} uppercase text-sm py-1 px-3 rounded-lg mr-1`}
      {...props}
    >
      {name}
    </motion.span>
  )
}
