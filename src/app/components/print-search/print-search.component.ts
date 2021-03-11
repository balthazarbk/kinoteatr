import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-print-search',
  templateUrl: './print-search.component.html',
  styleUrls: ['./print-search.component.scss'],
})
export class PrintSearchComponent implements OnInit, OnDestroy {
  productsByNameSearch: Product[];
  searchText: string;
  nothingFound = false;
  subject: Subscription;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.searchText = p.name;
      this.subject = this.productsService.productsByNameSearch.subscribe((productsByNameSearch: Product[]) => {
          if (productsByNameSearch.length === 0) {
            this.nothingFound = true;
          } else {
            this.productsByNameSearch = productsByNameSearch;
            this.nothingFound = false;
          }
          this.subject.unsubscribe();
      });
      this.productsService.searchBy(p.name);
    });
  }
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
