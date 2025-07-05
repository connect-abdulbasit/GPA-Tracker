import { authClient } from "@/lib/auth-client"

export async function getAuthUser() {
  const session = await authClient.getSession()
  return session?.data?.user?.id
}
