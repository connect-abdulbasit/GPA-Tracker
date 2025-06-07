import { auth } from "@clerk/nextjs/server"

export async function getAuthUser() {
  const { userId } = await auth()
  return userId
}
