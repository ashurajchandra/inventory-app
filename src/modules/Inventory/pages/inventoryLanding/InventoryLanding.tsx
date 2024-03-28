
import Widget from '../../components/common/widget/Widget';
import './InventoryLanding.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InventoryTable from '../../components/inventoryTable/InventoryTable';

const INVENTORY_HEADER = "Inventory stats"

const Inventory:React.FC = () =>{

    return(
        <div className='inventory-container'>
            <p>{INVENTORY_HEADER}</p>
            <div className='inventory-container-widget'>
                <Widget
                WidgetIcon = {ShoppingCartIcon}
                widgetTitle={"Total Product"}
                widgetValue = {"9"}
                />
                <Widget
                  WidgetIcon = {CurrencyExchangeIcon}
                  widgetTitle={"Total Store value"}
                  widgetValue = {"30,550"}
                />
                <Widget
                  WidgetIcon = {ProductionQuantityLimitsIcon}
                  widgetTitle={"Out of stock"}
                  widgetValue = {"2"}
                />
                <Widget
                  WidgetIcon = {CategoryIcon}
                  widgetTitle={"No of category"}
                  widgetValue = {"2"}
                />
            </div>
            <div className='inventory-container-table'>
                <InventoryTable/>
            </div>
        </div>
    )
}

export default Inventory;