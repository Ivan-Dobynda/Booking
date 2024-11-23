// import { NextResponse } from "next/server";
// import { duffel } from "@/lib/duffel";
// import { prisma } from "@/lib/prisma";


// export const POST = async (
//     req: Request,
//     context: { params: { id: string } }
// ) => {
//     try {
//         const id = context.params.id,
//             transaction = await prisma.transaction.findUnique({ where: { id } })
//         if (!transaction) return NextResponse.json({ status: 404, message: 'Transaction not found!' });
//         if (new Date(transaction.expires_at) < new Date()) return NextResponse.json({ status: 404, message: 'Transaction not found!' });
//         const res = (await duffel.paymentIntents.confirm(transaction.paymentId)).data

//         const newTransaction = await prisma.transaction.update({
//             where: { id },
//             include: {
//                 passengers: true,
//                 seatServices: true,
//             },
//             data: {
//                 status: res.status || "",
//                 card_network: res.card_network,
//                 card_last_four_digits: res.card_last_four_digits,
//                 confirmed_at: res.confirmed_at,
//                 updated_at: res.updated_at,
//                 paid: res.status === 'succeeded',
//                 card_country_code: res.card_country_code,
//                 fees_currency: res.fees_amount,
//                 net_currency: res.net_currency
//             }
//         })



//         if (res.status === 'succeeded') {
//             const order = (await duffel.orders.create({
//                 selected_offers: newTransaction.selected_offers,
//                 passengers: newTransaction.passengers,
//                 type: "instant",
//                 services: newTransaction.seatServices.map(seat => ({ id: seat.id, quantity: seat.quantity })),
//                 payments: [{
//                     type: 'balance',
//                     amount: newTransaction.amount,
//                     currency: newTransaction.currency,
//                 }]
//             })).data

//             await prisma.booking.create({
//                 data: {
//                     orderId: order.id,
//                     userId: transaction.user_id || '',
//                     airlineName: order.owner.name,
//                     amount: +order.total_amount,
//                     currency: order.base_currency,
//                     transactionId: transaction.id
//                 }
//             })

//             return NextResponse.json(
//                 {
//                     status: 200,
//                     message: "success",
//                     result: order,
//                 },
//                 {
//                     status: 200,
//                 }
//             );
//         }

//         return NextResponse.json(
//             {
//                 status: 500,
//                 message: "failure",
//                 result: "Something went wront",
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
//     catch (error: any) {
//         return NextResponse.json(
//             {
//                 status: 500,
//                 message: (error.errors ? error.errors[0].message : error.message) || "internal server error",
//                 result: error,
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }
