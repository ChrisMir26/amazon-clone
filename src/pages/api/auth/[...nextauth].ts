import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET!),
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID!),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET!),
    }),
  ],
})
