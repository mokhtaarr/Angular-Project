import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-by-cat-id',
  templateUrl: './product-by-cat-id.component.html',
  styleUrls: ['./product-by-cat-id.component.css'],
})
export class ProductByCatIdComponent implements OnInit {
  currentCatId: number = 0;
  prd: IProductOffer[] = [];
  prdOfferlist: IProductOffer[] = [];
  PriceFrom: number = 0;
  Priceto: number = 0;
  currentCulture: string;
 
  constructor(
    private productOfferApiservice: ProductOfferApiService,
    private activedRoute: ActivatedRoute,
    private shoppingCartservice: ShoppingCartService,
    private translate: TranslateService,
    private route:Router
  ) 
  {
    this.currentCulture = 'ar';
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((paramMap) => {
      this.currentCatId = paramMap.get('catid')
        ? Number(paramMap.get('catid'))
        : 0;
      // console.log(this.currentCulture);

      this.productOfferApiservice
        .getProductsByCatId(this.currentCatId)
        .subscribe((prdList) => {
          this.prdOfferlist = prdList;
          this.prdOfferlist.map(i =>i.productImageList[0].path="http://localhost:8080/"+i.productImageList[0].path)

        });
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
      this.currentCulture = event.lang;
    });
  }

  AddToCart(prd: IProductOffer) {
    this.shoppingCartservice.addToCart(prd);
    Swal.fire("Done","You Add Success","success");

    
  }
  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }
  

  filterProduct() {
    this.prdOfferlist = this.prdOfferlist.filter(
      (p) => p.totalPrice >= this.PriceFrom && p.totalPrice <= this.Priceto
    );
  }
}
