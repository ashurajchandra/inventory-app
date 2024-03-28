import {createContext} from 'react';
import { InventoryState } from './reducer';

export interface Context{
  state:  InventoryState;
  dispatch:any;
}


export const InventoryContext = createContext({} as Context)