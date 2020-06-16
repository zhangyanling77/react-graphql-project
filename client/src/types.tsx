export interface Category{
  id?: string;
  name?: string;
  products: Array<Product>
}

export interface Product{
  id?:string;
  name?: string;
  category?: Category;
  categoryId?: string | [];
}
  
export interface User {
  username?: string;
  nickname?: number;
  address?: string;
  avatar?: string;
}
