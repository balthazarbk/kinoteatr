import { Subject } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

export interface IProductsService {
  categories: Subject<Category[]>;
  products: Subject<Product[]>;
  productsByCategoryName: Subject<Product[]>;
  productsByNameSearch: Subject<Product[]>;
  getCategories(): void;
  getProducts(): void;
  getProductsBy(CategoryName: string): void;
  searchBy(name: string): void;
}
