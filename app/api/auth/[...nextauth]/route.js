import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { connectDb } from '@/config/dbConfig';
import { UserModel } from '@/models/User.model';
import bcryptjs from "bcryptjs";

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
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                  await connectDb();
                  const user = await UserModel.findOne({ email });
                  if (!user) {
                    throw new Error('User not found!')
                  }
                  const passwordMatch = await bcryptjs.compare(password, user.password);
                  if (!passwordMatch) {
                    throw new Error('Incorrect password!')
                  }
                  return user;
                } catch (error) {
                    throw new Error(error.message);
                }
              },
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