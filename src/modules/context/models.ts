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
  isDisabled:boolean
}

export interface CategoryItem{
  category:string,
  count:number
}
export interface WidgetData {
  categories:Map<string, number>
  totalProduct: number;
  totalStoreValue: number;
  outOfStock: number;
  numberOfCategory: number;
}
