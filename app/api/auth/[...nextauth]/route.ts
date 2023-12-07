import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { users } from "../../helpers/constants"

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Username", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password) {
                    return null
                }
                const user = users.find(user => user.email === credentials.email)
                if(!user) {
                    return null
                }
                if(user?.password == credentials.password) {
                    console.log('loged in');
                    
                    return user;
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }