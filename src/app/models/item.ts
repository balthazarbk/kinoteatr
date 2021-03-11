import { Category } from './category';

export class Item {
  id: number;
  name: string;
  year: number;
  description: string;
  price: number;
  imageUrl: string;
  categories: Category[];
}
