import { Injectable } from '@angular/core';
import { IProductsService } from '../interfaces/iproducts-service';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements IProductsService {
  categories = new Subject<Category[]>();
  products = new Subject<Product[]>();
  productsByCategoryName = new Subject<Product[]>();
  productsByNameSearch = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getCategories(): void {
    this.http
      .get('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
      .subscribe((data: any) => {
          const categories = data.map((category) => {
            const categoryObject = new Category();
            categoryObject.id = category.id;
            categoryObject.name = category.name;
            return categoryObject;
          });
          this.categories.next(categories);
        }, (err) => { console.log(err); });
  }
  getProducts(): void {
    const subject: Subscription = this.categories.subscribe(
      (categories: Category[]) => {
        const sourceCategories: Category[] = categories;
        this.http
          .get('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
          .subscribe((data: any) => {
              const products = data.map((product) => {
                const productObject = new Product();
                productObject.id = product.id;
                productObject.name = product.name;
                productObject.year = product.year;
                productObject.description = product.description;
                productObject.imageUrl = product.imageUrl;
                productObject.price = product.price;
                // get the category IDs corresponding to this product
                const categoryIds = product.productCategory.map((item) => item.categoryId);
                // filter and return only the same category from API and from this product.
                productObject.categories = sourceCategories.filter((item) => categoryIds.indexOf(item.id) > -1);
                return productObject;
              });
              this.products.next(products);
              subject.unsubscribe();
            }, (err) => { console.log(err); });
      }
    );
    this.getCategories();
  }
  getProductsBy(CategoryName: string): void {
    // get the categories from API.
    const subject: Subscription = this.categories.subscribe(
      (categories: Category[]) => {
        const sourceCategories: Category[] = categories;
        // get the products from API.
        this.http
          .get('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
          .subscribe((data: any) => {
              const products = data.map((product) => {
                const productObject = new Product();
                productObject.id = product.id;
                productObject.name = product.name;
                productObject.year = product.year;
                productObject.description = product.description;
                productObject.imageUrl = product.imageUrl;
                productObject.price = product.price;
                // get the category IDs corresponding to this product.
                const categoryIds = product.productCategory.map((item) => item.categoryId);
                // filter and return only the same category from API and from this product.
                productObject.categories = sourceCategories.filter((item) => categoryIds.indexOf(item.id) > -1);
                return productObject;
              });
              // transform category name from lower to titlecase.
              const currentCategoryName = CategoryName;
              const currentCategoryNameAsTitle = currentCategoryName.replace(
                currentCategoryName[0],
                currentCategoryName[0].toUpperCase()
              );
              // filter the products by category and create array of products filtered by category.
              const productsByCategoryName: Product[] = [];
              products.forEach((product) => {
                const categoryNames = product.categories.map((item) => item.name);
                if (categoryNames.indexOf(currentCategoryNameAsTitle) > -1) {
                  productsByCategoryName.push(product);
                }
              });
              this.productsByCategoryName.next(productsByCategoryName);
              subject.unsubscribe();
            }, (err) => { console.log(err); });
      }
    );
    this.getCategories();
  }
  searchBy(name: string) {
    const searchUrl = 'https://medieinstitutet-wie-products.azurewebsites.net/api/search?=' + name;
        // GET with Search Query
    const subject: Subscription = this.http.get(searchUrl).subscribe((data: any) => {
      if (!data.length) {
        const noProductsWereFound = [];
        this.productsByNameSearch.next(noProductsWereFound);
      } else {
        const productsByNameSearch = data.map((product: Product) => {
          const productObject = new Product();
          productObject.id = product.id;
          productObject.name = product.name;
          productObject.year = product.year;
          productObject.description = product.description;
          productObject.imageUrl = product.imageUrl;
          productObject.price = product.price;
          productObject.categories = [];
          return productObject;
        });
        this.productsByNameSearch.next(productsByNameSearch);
      }
      subject.unsubscribe();
    });
  }
}
