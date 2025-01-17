export interface HeadCells {
  id: string;
  label: string;
}

export interface InventoryData{
category:string;
name:string;
price:string;
quantity:number
value:string
}

export const headCells: HeadCells[] = [
  {
    label: "Name",
    id: "name",
  },
  {
    label: "Category",
    id: "category",
  },
  {
    label: "Price",
    id: "price",
  },
  {
    label: "Quantity",
    id: "quantity",
  },

  {
    label: "Value",
    id: "value",
  },
  {
    label: "Action",
    id: "action",
  },
];
