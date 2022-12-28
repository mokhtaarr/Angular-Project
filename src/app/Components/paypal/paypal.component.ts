import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
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
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  price: number = 0;
  Userid: string;
  item: IProductOffer[] = [];
  orderId:number =0;
  shoppingCartId:number =0;
  constructor(
    private activedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private shoppingCartservice: ShoppingCartService,
    private route: Router,

    private shoppingCartSer: ShoppingCartAPIService,
    private paymentSer: PaymentAPIService,
    private orderSer: OrderAPIService
  ) {
    this.Userid = this.cookieService.get('Id');
  }

  ngOnInit(): void {
    this.initConfig();
    this.activedRoute.paramMap.subscribe((paramMap) => {
      this.price = paramMap.get('price') ? Number(paramMap.get('pid')) : 0;
    });
    this.item = this.shoppingCartservice.getItems();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AToDsg4D_1Rdhkp5gEA71rJcqvKLRahIV5DEC2wSVFdAkz6XdYODv2GsHzqx0UbqPCi-A3xLKSVabQX6', // add paypal clientId here
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: '1000', //Total Price
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: '1000', // Total Price
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',

        color: 'blue',
        shape: 'rect',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });

        var shoppingcartID: number = 0;

        //get items id to add in shopping cart
        var itemsId: number[] = [];
        for (const iterator of this.item) {
          itemsId.push(iterator.id);
        }

        // add Item in shopping cart
        var ShoppingCart:IShoppingCart={productList:this.item}

        this.shoppingCartSer.Add(ShoppingCart).subscribe((Id: number) => {
          this.shoppingCartId = Id;
        });
        //add payment
        var payment: IPayment = {
          id: 0,
          paymentType: 'Credit',
          isAllowed: true,
        };

        this.paymentSer.Add(payment).subscribe((ConfirmedPaymentId: number) => {
         this.orderId = ConfirmedPaymentId;
        });
        
        //submit the order
        
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

        
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}