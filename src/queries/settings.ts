import authOptions from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { User } from "@prisma/client"

export const getTravelers = async (): Promise<User[]> => {
  const authSession = await getServerSession(authOptions)

  const travelers = await prisma.user.findMany({ where: { associateWithTravelerId: authSession?.user.id } })

  return travelers
}
