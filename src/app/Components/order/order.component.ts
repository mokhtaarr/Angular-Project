import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { OrderAPIService } from 'src/app/Services/order-api.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  Address : string ;
  items : IProductOffer[] =[];
  length:number=0;
  constructor(
    private cookieService: CookieService,
    private orderSer: OrderAPIService,private OrderService :OrderService
  ) {
    this.Address = this.cookieService.get('UserAddress');
    
  }

  ngOnInit(): void {
  // var OrderItems = localStorage.getItem('');
  // if( OrderItems!= undefined ){
  //   this.items? JSON.parse(OrderItems):[];
  //   this.length=this.items.length;
    this.items = this.OrderService.getItems();
    this.length=this.items.length;

    
    
  }

 

  deleteOrder() {
    var orderId = this.cookieService.get('orderId');
    this.orderSer.delete(+orderId).subscribe(() => {});
  }
}
