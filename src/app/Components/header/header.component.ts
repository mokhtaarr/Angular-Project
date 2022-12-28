import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ICategory } from 'src/app/Models/ICategory';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { CategoryApiService } from 'src/app/Services/category-api.service';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  catlist?: ICategory[];
  SelectedCatId: number = 0;
  currentCulture: string;
  searchItems: IProductOffer[] = [];
  prdOfferlist: IProductOffer[] = [];
  searchLanguage: string="ar";
  constructor(
    private categoryApiService: CategoryApiService,
    public translate: TranslateService,
    private route: Router,
    private productOfferApiService: ProductOfferApiService
  ) {
    this.currentCulture = 'ar';
  }

  ngOnInit(): void {
    this.categoryApiService
      .getAllGategory()
      .subscribe((list) => (this.catlist = list));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentCulture = event.lang;
    });

    this.productOfferApiService
      .getAllProductOffer()
      .subscribe((prd) => (this.prdOfferlist = prd));
  }

  OpenPrdDetails(prdID: number) {
    this.route.navigate(['productdetails', prdID]);
  }

  OpenPrdByCatId(catid: number) {
    this.route.navigate(['productByCatId', catid]);
  }

  filterByName(item: string) {
    var english = /^[A-Za-z0-9]*$/;
    this.searchLanguage="en";
    if (english.test(item)) {
    
      this.searchItems = this.prdOfferlist.filter((b) =>
        b.nameEN.includes(item)
      );
    } else {
      this.searchLanguage="ar";
  
      this.searchItems = this.prdOfferlist.filter((b) =>
        b.nameAR.includes(item)
      );
    }

    if (item == "" || item.length == 0) {
      this.searchItems = [];
    }
  
  }
}
