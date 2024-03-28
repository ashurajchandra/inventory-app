import {useEffect, useContext } from "react";
import Widget from "../../components/common/widget/Widget";
import "./InventoryLanding.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InventoryTable from "../../components/inventoryTable/InventoryTable";
import { getInventoryData } from "../../services/apis";
import { InventoryData } from "../../utils/data-utils";
import { InventoryContext } from "../../../context/context";
import { setInventoryData, setIsLoading, setWidgetData } from "../../../context/action";

const INVENTORY_HEADER = "Inventory stats";

const Inventory: React.FC = () => {
  const { state:{inventoryData}, dispatch } = useContext(InventoryContext);
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setIsLoading(true))
        const resp = await getInventoryData();
        dispatch(setIsLoading(false))
        if (resp !== undefined && resp.data.length > 0) {
           const inventoryData = resp.data.map((item:InventoryData)=>{
            return{
              ...item,
              isDisabled:false
            }
           })
          dispatch(setInventoryData(inventoryData));
        }
      } catch (err) {
        dispatch(setIsLoading(false))
        console.log("err in getting data", err);
      }
    };

    getData();
  }, []);
  const totalProduct = inventoryData.filter((item)=>!item.isDisabled).length;
  const totalStoreValue = inventoryData.reduce((acc,currentValue)=> {
    const storeValue= currentValue.isDisabled? 0 : parseInt(currentValue.value.replace('$','')) 
    acc = acc+storeValue
    return acc
  },0)
  const outOfStock = inventoryData.reduce((acc,currentValue)=> {
    if(currentValue.isDisabled){
      return acc
    }
    const quantity =  currentValue.quantity>0?0:1
    acc = acc+quantity
    return acc
  } ,0)





  const uniqueCategory = new Set(inventoryData.map((item)=>item.category))
  const widgetData = [{icon:ShoppingCartIcon,title:'Total Product', value:totalProduct},{icon:CurrencyExchangeIcon,title:'Total Store value',value:`$ ${totalStoreValue}`},
          {icon:ProductionQuantityLimitsIcon, title:'Out of stock', value:outOfStock},{icon:CategoryIcon, title:'No of category', value:uniqueCategory.size}]

  return (
    <div className='inventory-container'>
      <p>{INVENTORY_HEADER}</p>
      <div className='inventory-container-widget'>
        {
          widgetData.map(({icon,title,value},index)=>(
            <Widget
            key={index}
            WidgetIcon={icon}
            widgetTitle={title}
            widgetValue={value}
          /> 
          ))
        }
      </div>
      <div className='inventory-container-table'>
        <InventoryTable />
      </div>
    </div>
  );
};

export default Inventory;
