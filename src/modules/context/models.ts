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
