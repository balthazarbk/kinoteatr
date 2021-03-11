import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.categories.subscribe((categories: Category[]) => {
      // this to filter out when categories got added 'inadvertently'
      const filteredCategories = categories.filter(category => {
        return category.name !== null;
      });
      this.categories = filteredCategories;
    });
  }
}
