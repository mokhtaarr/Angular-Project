import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.css']
})
export class CardBodyComponent implements OnInit {
 prdOfferlist:IProductOffer[]=[];
 inputPrice:number=0 ;
 currentCulture: string;
 PrdListClone:IProductOffer[]=[]

  constructor(private productOfferApiService:ProductOfferApiService , private route:Router
    , private shoppingCartservice:ShoppingCartService,
    private translate: TranslateService) { 
      this.currentCulture = 'ar';
  }

  ngOnInit(): void {
    this.productOfferApiService.getAllProductOffer().subscribe(
       (prd)=>{this.prdOfferlist=prd
    this.PrdListClone=this.prdOfferlist 
   
        this.prdOfferlist.map(i =>i.productImageList[0].path="http://localhost:8080/"+i.productImageList[0].path)
      
   });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });
    // this.prdOfferlist.map(i =>i.productImageList[0].path="http://localhost:8080/"+i.productImageList[0].path)

    
   
  }
  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }
  
  AddToCart(prd:IProductOffer)
  {
    this.shoppingCartservice.addToCart(prd);
    Swal.fire("Done","You Add Success","success");
     

  }


  filterByName(item:string)
  {
    console.log(item);
    console.log(this.PrdListClone);
    
    if(item==""){
this.prdOfferlist = this.PrdListClone
    }
    this.prdOfferlist = this.prdOfferlist.filter(b=>b.nameAR.startsWith(item))
  }
}
