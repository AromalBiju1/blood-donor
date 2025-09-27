import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDB } from "@/lib/db";
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers : [
        
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"Email", type:"email" },
                password :{label:"Password",type:"password"},
            },

            async authorize(credentials) {
                const db = await getDB();
                const [rows] = await db.query(
                    "SELECT * FROM users WHERE email = ?",[credentials.email]
                );

                if(rows.length == 0) {
                    throw new Error("No user found");
                }
                const user = rows[0];

                const isValid = bcrypt.compare(credentials.password,user.password);
                if(!isValid) {
                    throw new Error("Incorrect password");
                }
                return {
                    id : user.id,
                    name:user.name,
                    email : user.email
                };
            },
        }),
    ],
    session :{
        strategy:"jwt"
    },
    callbacks :{
     async jwt({token,user}) {
        if(user) {
            token.id = user.id;
        }
        return token;
     }
    },
    async session({session,token}) {
      session.user.id = token.id;
      return session
    },
    pages:{
        signIn:"auth/signin",
    },
};

const handler = NextAuth(authOptions);
export {
    handler as GET,
    handler as POST
};