
import {useState, useEffect, useContext} from 'react';
import Widget from '../../components/common/widget/Widget';
import './InventoryLanding.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InventoryTable from '../../components/inventoryTable/InventoryTable';
import { getInventoryData } from '../../services/apis';
import { InventoryData } from '../../utils/data-utils';
import { InventoryContext } from '../../../context/context';
import { setInventoryData, setWidgetData } from '../../../context/action';

const INVENTORY_HEADER = "Inventory stats"

const Inventory:React.FC = () =>{
  const {state, dispatch} = useContext(InventoryContext)
 // const [inventoryData, setInventoryData] = useState<InventoryData[]>([])
  useEffect(()=>{
    const getData = async()=>{
      
     try{
      const resp = await getInventoryData()
      if(resp !=undefined && resp.data.length>0){
        let widgetData = {
          outOfStock: 0,
          numberOfCategory: 0,
          totalProduct: 0,
          totalStoreValue: 0
      };

      let categories = new Set();
      
      resp.data.forEach((product:InventoryData )=> {
          if (product.quantity === 0) {
              widgetData.outOfStock++
          }
          categories.add(product.category);
    
          widgetData.totalProduct++;
          widgetData.totalStoreValue += parseInt(product.value.replace('$', '')) * product.quantity;
      });
      widgetData.numberOfCategory = categories.size;

// Convert totalValue back to string format with '$' symbol
//widgetData.totalStoreValue = parseInt(widgetData.totalStoreValue);
      console.log("widgetData",widgetData)
        dispatch(setWidgetData(widgetData))
        dispatch(setInventoryData(resp.data))
        
      }
      console.log("resp",resp)
     }catch(err){
      console.log("err in getting data",err)
     }
    }

    getData()
  },[])

    return(
        <div className='inventory-container'>
            <p>{INVENTORY_HEADER}</p>
            <div className='inventory-container-widget'>
                <Widget
                WidgetIcon = {ShoppingCartIcon}
                widgetTitle={"Total Product"}
                widgetValue = {state.widgetData.totalProduct}
                />
                <Widget
                  WidgetIcon = {CurrencyExchangeIcon}
                  widgetTitle={"Total Store value"}
                  widgetValue = {state.widgetData.totalStoreValue}
                />
                <Widget
                  WidgetIcon = {ProductionQuantityLimitsIcon}
                  widgetTitle={"Out of stock"}
                  widgetValue = {state.widgetData.outOfStock}
                />
                <Widget
                  WidgetIcon = {CategoryIcon}
                  widgetTitle={"No of category"}
                  widgetValue = {state.widgetData.numberOfCategory}
                />
            </div>
            <div className='inventory-container-table'>
                <InventoryTable/>
            </div>
        </div>
    )
}

export default Inventory;