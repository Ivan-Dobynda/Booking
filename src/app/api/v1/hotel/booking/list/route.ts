import app from "@/lib/app";
import { prisma } from "@/lib/prisma";

export const GET = app(async req => {
   const bookings = await prisma.hotelBooking.findMany({
      where: {
         userId: req.user?.id
      },
      orderBy: {
         createdAt: 'desc'
      }
   })
   return {
      result: bookings,
      status: 200,
      message: 'success'
   }
})