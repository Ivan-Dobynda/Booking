import app from "@/lib/app";
import { prisma } from "@/lib/prisma";

export const GET = app(async req => {
   const bookings = await prisma.transaction.findMany({
      where: {
         userId: req.user?.id
      },
      orderBy: {
         created_at: 'desc'
      }
   })
   return {
      result: bookings,
      status: 200,
      message: 'success'
   }
})