export interface IOrder {
    id: number,
    customerId: string,
    paymentId: number,
    orderDate: Date,
    
    shoppingCartId: number
}
