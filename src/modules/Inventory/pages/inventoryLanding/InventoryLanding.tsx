
import Widget from '../../components/common/widget/Widget';
import './InventoryLanding.scss'

const INVENTORY_HEADER = "Inventory stats"

const Inventory:React.FC = () =>{

    return(
        <div className='inventory-container'>
            <p>{INVENTORY_HEADER}</p>
            <div className='inventory-container-widget'>
                <Widget/>
                <Widget/>
                <Widget/>
                <Widget/>
            </div>
        </div>
    )
}

export default Inventory;