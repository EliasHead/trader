'use client'

import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string
  color?: string
}

export const TechBadge = ({ name, color, ...props }: TechBadgeProps) => {
  return (
    <motion.span
      className={`${color} bg-emerald-900/80 text-sm py-1 px-3 rounded-lg mr-1`}
      {...props}
    >
      {name}
    </motion.span>
  )
}
