
import {Action,InventoryData,WidgetData } from './models';

export const ISADMIN = "ISADMIN";
export const INVENTORYDATA = "INVENTORYDATA";
export const WIDGETDATA = "WIDGETDATA";
export const ISLOADING = "ISLOADING"

export const setIsLoading = (payload:boolean):Action=>{
    return {
        type:ISLOADING,
        payload
    }
}

export const setIsAdmin = (payload:boolean):Action=>{
    return {
        type:ISADMIN,
        payload
    }
}

export const setInventoryData = (payload:InventoryData[]):Action=>{
    return {
        type:INVENTORYDATA,
        payload
    }
}

export const setWidgetData = (payload:WidgetData):Action=>{
    return {
        type:WIDGETDATA,
        payload
    }
}