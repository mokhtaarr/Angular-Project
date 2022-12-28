import { Injectable } from '@angular/core';
import { IProductOffer } from '../Models/iproduct-offer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
addedItem:IProductOffer[]=[];
items:IProductOffer[] = [];

  constructor() { }

  addToCart(addedItem:IProductOffer) {
    addedItem.quantity=1;
    this.items.push(addedItem);

    this.saveCart();
  }

  getItems() {
    this.items = this.loadCart();
    return this.items;
  } 

  loadCart() {
    const item = window.localStorage.getItem("cart_items");
    return item? JSON.parse(item):[];
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items)); 
  }

  clearCart() {
    this.items = [];

    localStorage.removeItem("cart_items")
  }

  removeItem(item:IProductOffer) {
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(item:IProductOffer): boolean {
    return this.items.findIndex(o => o.id === item.id) > -1;
  }
}


