import { Injectable } from '@angular/core';
import { IProductOffer } from '../Models/iproduct-offer';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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
      const item = window.localStorage.getItem("orderItems");
      return item? JSON.parse(item):[];
    }
  
    saveCart(): void {
      localStorage.setItem('orderItems', JSON.stringify(this.items)); 
    }
  
    clearCart() {
      this.items = [];
  
      localStorage.removeItem("orderItems")
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
