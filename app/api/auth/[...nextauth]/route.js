import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { connectDb } from '@/config/dbConfig';
import { UserModel } from '@/models/User.model';
import bcryptjs from "bcryptjs";

export const authOptions = {
    providers:[
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
                  console.log(error)
                    throw new Error(error.message);
                }
              },
        }),
        GoogleProvider({
          clientId:process.env.GOOGLE_ID,
          clientSecret:process.env.GOOGLE_SECRET,
      })
    ],
    callbacks: {
      async jwt({ token, trigger, session,user }) {
        if (trigger === 'update' && session?.name) {
          token.name = session.name
        }
        if (user) {
          token.uid = user;
        }
        return token
      },
      async signIn({user,account}){
        if(account?.provider == 'credentials'){
          return true
        }
        if (account.provider && account.provider === "google") {
          const { email, name } = user;
          try {
            await connectDb();
            const isUserExist = await UserModel.findOne({ email });
            if (!isUserExist) {
              const newUser = new UserModel({username:name,email})
              const newData = await newUser.save();
              return true
            }else{
              return true
            }
          } catch (error) {
            console.error("Error saving user to MongoDB:", error);
          return null;
          }
        }
      },
      session: async ({ session, token }) => {
        session.userData = {...token?.uid}
      return session;
    },
    },
    pages: {
      signIn: '/login'
    },
    strategy: "jwt",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };