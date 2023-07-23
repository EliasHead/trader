export interface NavbarItemType {
  label: string
  href: string
}

export const NavbarArray: Array<NavbarItemType> = [
  {
    label: 'Jogos',
    href: '/matches',
  },
  {
    label: 'Times',
    href: '/teams',
  },
  {
    label: 'Campeonatos',
    href: '/competitions',
  },
  {
    label: 'Bilhetes',
    href: '/tickets',
  },
]
