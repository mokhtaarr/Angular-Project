import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductApiService } from 'src/app/Services/product-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
prdlist:IProductOffer[]=[];
currentCulture: string;
  constructor(private productApiService:ProductApiService,
    private route:Router
    , private shoppingCartservice:ShoppingCartService,
     private translate: TranslateService) {
      this.currentCulture = 'ar';
      }

  ngOnInit(): void {
    this.productApiService.getAllProduct().subscribe((result)=>{
    this.prdlist = result;
      // this.prdlist = result.filter(p=>p.discount>0);
      this.prdlist.map(i =>i.productImageList[0].path="http://localhost:8080/"+i.productImageList[0].path)
     
  });
  
      
  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.currentCulture = event.lang;
  });

  

  }

  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }
  
  AddToCart(prd:IProductOffer)
  {
    this.shoppingCartservice.addToCart(prd);
    Swal.fire("Done","You Add Success","success");

  }
}
