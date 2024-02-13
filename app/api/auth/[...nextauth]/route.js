import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:'Email',type:'text',placeholder:"dhanu"},
                password:{label:'Password',type:'password'},
                username:{label:'Username',type:'text',placeholder:"dhanu"},
            },
            async authorize(credentials){
                const user = {id:1,name:'Dhanush',email:'dhanu@gmail.com'}
                return user
            }
        })
    ],
    secret:process.env.SECRET,
    session: {
        strategy: "jwt",
      },
    debug:process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };