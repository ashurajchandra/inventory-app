export interface Action {
  payload: any;
  type: string;
}
export interface InventoryData {
  category: string;
  name: string;
  price: string;
  quantity: number;
  value: string;
}

interface Category{
  category:string
}
export interface WidgetData {
  categories:string[]
  totalProduct: number;
  totalStoreValue: number;
  outOfStock: number;
  numberOfCategory: number;
}
