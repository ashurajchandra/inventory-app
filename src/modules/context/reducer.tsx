import{Action,InWidgetData,InventoryData} from './models';
import{
    ISADMIN,
    INVENTORYDATA,
    WIDGETDATA
} from './action';


export interface InventoryState{
    isAdmin:boolean;
    widgetData:InWidgetData;
    inventoryData:InventoryData[]
}


export const initialInventoryState: InventoryState = {
    isAdmin:true,
    widgetData:{ totalProduct: 0,
        totalStoreValue: 0,
        outOfStock: 0,
        numberOfCategory: 0},
    inventoryData: []
}


export const inventoryReducer = (state:InventoryState = initialInventoryState,action:Action):InventoryState=>{
    switch(action.type){
        case ISADMIN:{
            return {
                ...state,
                isAdmin:action.payload
            }
        }
        case INVENTORYDATA:{
            return {
                ...state,
                inventoryData:action.payload
            }
        }
        case WIDGETDATA:{
            return {
                ...state,
                widgetData:action.payload
            }
        }

        default : return state
    }
}