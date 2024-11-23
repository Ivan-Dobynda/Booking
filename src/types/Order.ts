export default interface Order {
    id: string,
    airlineName: string,
    transactionId: null | string,
    orderId: string,
    userId: string,
    amount: number,
    created_at: Date,
    currency: string
}