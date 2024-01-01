import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItemProps = {
  label: string
  href: string
}

export const NavItem = ({ label, href }: NavItemProps) => {
  const psthname = usePathname()

  const isActive = psthname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 font-medium font-mono',
        isActive && 'text-foreground font-semibold',
      )}
    >
      <span>#</span>
      {label}
    </Link>
  )
}
