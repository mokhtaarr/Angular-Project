import { IProductImage } from "./iproduct-image"

export interface IProduct {
    // id:number;
    // name:string;
    // price:string;
    // imgURL:string;

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
