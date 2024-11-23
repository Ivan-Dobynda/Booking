import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { firstName, lastName, email, mobile, dob, gender, emergencyContact } = await req.json()

    const user = await prisma.user.findUnique({ where: { NOT: { id: params.id }, email } })

    if (user) throw new Error("Email already exist")

    await prisma.user.update({
      where: { id: params.id },
      data: {
        firstName,
        lastName,
        email,
        mobile,
        dob: new Date(dob),
        gender,
        emergencyContact,
      },
    })

    return NextResponse.json({
      message: "Traveler details updated successfully",
      data: {},
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        error: error?.message || "Something went wrong while updating the details",
      },
      {
        status: 500,
      }
    )
  }
}
