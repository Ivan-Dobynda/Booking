import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

import {prisma} from "@/lib/prisma";
import authOptions from "@/lib/auth/authOptions";

export async function PUT(request: Request) {

    const payload = await request?.json();
    const session = await getServerSession(authOptions);

    const data: any = {};

    const fields = [
        "firstName",
        "lastName",
        "mobile",
        "dob",
        "gender",
        "emergencyContact",
    ];

    fields.forEach((field) => {
        if (payload[field]) data[field] = payload[field];
    });

    try {

        let additionalTraveller: any;

        if (!payload?.id) {
            additionalTraveller = await prisma.additionalTraveler.create({
                data: {
                    ...data,
                    userId: session?.user?.id as string,
                }
            })
        } else {
            additionalTraveller = await prisma.additionalTraveler.update({
                where: {id: payload?.id},
                data: {userId: data?.user?.id, ...data},
            });
        }

        return NextResponse.json({
            message: "Additional traveler has been updated.",
            data: {
                id: additionalTraveller.id,
                firstName: additionalTraveller?.firstName,
                lastName: additionalTraveller?.lastName,
            },
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Something went wrong. Please try again later.",
            },
            {status: 500}
        );
    }
}
