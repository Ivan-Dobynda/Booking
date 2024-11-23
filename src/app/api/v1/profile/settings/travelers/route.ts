import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth/authOptions"

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const authSession = await getServerSession(authOptions)
    const { firstName, lastName, email, mobile, dob, gender, emergencyContact } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) throw new Error("User already exist with same email.")

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        mobile,
        dob: new Date(dob),
        gender,
        role: Role.TRAVELER,
        password: "",
        emergencyContact,
        associateWithTraveler: { connect: { id: authSession?.user.id } },
      },
    })

    return NextResponse.json({
      message: "New traveler added successfully",
      data: {},
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        error: error?.message || "Something went wrong while creating traveler",
      },
      {
        status: 500,
      }
    )
  }
}
