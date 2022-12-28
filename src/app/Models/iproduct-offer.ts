import { IProductImage } from "./iproduct-image"

export interface IProductOffer {
    // beforeOffer: any;
    // id:number;
    // name:string;
    // Price:number;
    // imgURL:string;
    // BeforeOffer:string;
    // Save:string;
    // qtyTotal:number;
    // Quantity:number;
    
    id: number,
    nameAR:string,
    nameEN: string,
    brand:string,
    description: string,
    categoryID: number,
    quantity: number,
    unitPrice: number,
    discount: number,
    totalPrice: number,
    
    productImageList:IProductImage []
}