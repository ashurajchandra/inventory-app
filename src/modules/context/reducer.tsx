import{Action,InventoryData} from './models';
import{
    ISADMIN,
    INVENTORYDATA,
    ISLOADING
} from './action';


export interface InventoryState{
    isAdmin:boolean;
    inventoryData:InventoryData[];
    isLoading:boolean;
}


export const initialInventoryState: InventoryState = {
    isAdmin:true,
    inventoryData: [],
    isLoading:false
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
        case ISLOADING:{
            return {
                ...state,
                isLoading:action.payload
            }
        }

        default : return state
    }
}