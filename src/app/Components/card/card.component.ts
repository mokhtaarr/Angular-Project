import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IPayment } from 'src/app/Models/ipayment';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { IShoppingCart } from 'src/app/Models/ishopping-cart';
import { Loggeduser } from 'src/app/Models/loggeduser';
import { OrderAPIService } from 'src/app/Services/order-api.service';
import { PaymentAPIService } from 'src/app/Services/payment-api.service';
import { ShoppingCartAPIService } from 'src/app/Services/shopping-cart-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  user!: Loggeduser;
  item: IProductOffer[] = [];
  TotalPrice: number = 0;
  paymentMethod: string = '';
  inputPrice: number = 0;
  currentCulture: string;
  length: number = 0;
  totalprice: number[] = [];
  orderId: number = 0;
  shoppingCartId: number = 0;
  constructor(
    private shoppingCartservice: ShoppingCartService,
    private route: Router,
    private cookieService: CookieService,
    private shoppingCartSer: ShoppingCartAPIService,
    private paymentSer: PaymentAPIService,
    private orderSer: OrderAPIService,
    private translate: TranslateService
  ) {
    this.currentCulture = 'ar';
  }

  ngOnInit(): void {
    this.item = this.shoppingCartservice.getItems();
    // this.item.map((i) => (i.quantity = 1));
    // this.item.map(i =>i.productImageList[0].path="http://localhost:8080/"+i.productImageList[0].path)
    
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    this.length = this.item.length;
// console.log(this.item[0].productImageList[0].path);

    this.calcTotalPrice();
  }

  // filterProduct()
  // {

  //   this.item = this.item.filter(b=>b.totalPrice< this.inputPrice)
  // }

  // filterByName(item:string)
  // {
  //   this.item = this.item.filter(b=>b.name.startsWith(item))
  // }

  addToCart(it: IProductOffer) {
    if (!this.shoppingCartservice.itemInCart(it)) {
      it.quantity = 1;
      this.shoppingCartservice.addToCart(it); //add items in cart
      this.item = this.shoppingCartservice.getItems();
    }
  }

  // OrderSubmit() {
  //   var id = this.cookieService.get('Id');
  //   if (id == null || id == undefined) {
  //     this.route.navigate(['LogIn']);
  //   } else {
  //     var price = this.TotalPrice;
  //     if (this.paymentMethod == 'cash') {
  //       //Shopping cart Item
  //       var ShoppingCart: IShoppingCart = { productList: this.item };

  //       //add Item in shopping cart
  //       this.shoppingCartSer.Add(ShoppingCart).subscribe((data) => {
  //         (Id: number) => {
  //           this.shoppingCartId = Id;

  //           // add payment
  //           var payment: IPayment = {
  //             id: 0,
  //             paymentType: 'Cash',
  //             isAllowed: true,
  //           };

  //           this.paymentSer.Add(payment).subscribe((data) => {
  //             (ConfirmedPaymentId: number) => {
  //               this.orderId = ConfirmedPaymentId;

  //               var order: IOrder = {
  //                 id: 0,
  //                 customerId: this.cookieService.get('Id'),
  //                 paymentId: this.orderId,
  //                 orderDate: new Date(),

  //                 shoppingCartId: this.shoppingCartId,
  //               };
  //               this.orderSer.Add(order).subscribe((orderId: number) => {
  //                 this.cookieService.set('orderId', orderId.toString());
  //               });

  //               localStorage.setItem('orderItems', JSON.stringify(this.item));
  //               this.shoppingCartservice.clearCart();
  //               this.route.navigate(['Order']);
  //             };
  //           });
  //         };
  //       });
  //     }
  //     if (this.paymentMethod == "visa") {
  //             this.route.navigate(['pay', price]);
  //           }
  //   }
  // }
  OrderSubmit() {
    var id = this.cookieService.get('Id');
    if (id == null || id == undefined) {
      this.route.navigate(['LogIn']);
    } else {
      var price = this.TotalPrice;
      if (this.paymentMethod == "cash") {

      var ShoppingCart:IShoppingCart={productList:this.item}

        // add Item in shopping cart
        this.shoppingCartSer.Add(ShoppingCart).subscribe((Id: number) => {
          this.shoppingCartId = Id;
        });
        //add payment
        var payment: IPayment = { id: 0, paymentType: 'Cash', isAllowed: true };

        this.paymentSer.Add(payment).subscribe((ConfirmedPaymentId: number) => {
          this.orderId = ConfirmedPaymentId;
        });

        setTimeout(()=>{
          //submit the order
        var order: IOrder = {
          id: 0,
          customerId: this.cookieService.get('Id'),
          paymentId:this.orderId,
          orderDate: new Date(),

          shoppingCartId: this.shoppingCartId,
        };
         this.orderSer.Add(order).subscribe((orderId: number) => {
          this.cookieService.set('orderId', orderId.toString());
        });

          localStorage.setItem('orderItems', JSON.stringify(this.item));
        this.shoppingCartservice.clearCart();
         this.route.navigate(['Order']);
        // Add order items on local storage

        },3000);

      }
      if (this.paymentMethod == "visa") {
        this.route.navigate(['pay', price]);
      }
    }
  }

  calcTotalPrice() {
    this.TotalPrice = 0;
    for (const i of this.item) {
      this.TotalPrice += i.quantity * i.totalPrice;
    }
  }
}
