import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db as prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GithubProvider({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId: process.env.GITHUB_CLIENTID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'elias@email.com' },
        password: { label: 'Password', type: 'password' },
        username: { label: 'Name', type: 'text', placeholder: 'Elias Costa' },
      },
      async authorize(credentials, req): Promise<any> {
        // console.log('authorize method', credentials)

        if (!credentials?.email || !credentials?.password)
          throw new Error('Dados de Login necessarios')

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        // console.log('USER', user)

        if (!user || !user.hashedPassword) {
          throw new Error('Usuários não registrado através de credenciais')
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        )

        if (!matchPassword) throw new Error('Senha incorreta')

        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development',
}
