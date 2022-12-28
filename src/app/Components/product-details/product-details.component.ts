import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { Location } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
prd!:IProductOffer;
currentPrdID :number = 0;
mainImage :string="" ;
currentCulture: string;
  constructor(private productOfferApiservice : ProductOfferApiService,
              private activedRoute:ActivatedRoute,
              private shoppingCartservice:ShoppingCartService,
              private location: Location,
              private translate: TranslateService ) { 
                this.currentCulture = 'ar';
              }

  ngOnInit(): void {

    this.activedRoute.paramMap.subscribe(paramMap =>{
      this.currentPrdID=(paramMap.get('pid'))?Number(paramMap.get('pid')):0;
      
     this.productOfferApiservice.getProductByID(this.currentPrdID).subscribe(prdid=>{this.prd=prdid
    this.prd.productImageList.map(i=>i.path="http://localhost:8080/"+i.path);
 this.mainImage=this.prd.productImageList[0].path;
 
    })
    
   this.prd.productImageList.shift();
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    }); }
    )
    
  }
  
  AddToCart(prd:IProductOffer)
  {
    this.shoppingCartservice.addToCart(prd);
    Swal.fire("Done","You Add Success","success");
  }

  change_image(imgpath:string){
this.mainImage=imgpath;
  }
  prevPage(){
    this.location.back();
  }
}
