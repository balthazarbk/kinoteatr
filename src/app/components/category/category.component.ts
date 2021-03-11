import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  productsByCategoryName: Product[] = [];
  subject: Subscription;
  currentCategoryName = '';

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.currentCategoryName = p.name;
      this.subject = this.productsService.productsByCategoryName.subscribe((productsByCategoryName: Product[]) => {
        this.productsByCategoryName = productsByCategoryName;
      });
      this.productsService.getProductsBy(this.currentCategoryName);
    });
  }
  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }
}
