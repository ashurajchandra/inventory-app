
import {Action,InventoryData,InWidgetData } from './models';

export const ISADMIN = "ISADMIN";
export const INVENTORYDATA = "INVENTORYDATA";
export const WIDGETDATA = "WIDGETDATA"



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

export const setWidgetData = (payload:InWidgetData):Action=>{
    return {
        type:WIDGETDATA,
        payload
    }
}