import { Category } from './category';

export class Product {
  id: number;
  name: string;
  year: number;
  description: string;
  price: number;
  imageUrl: string;
  categories: Category[];
  productCategory?: [{ categoryId: number }];
}
