import React, {useReducer} from 'react';
import './App.scss';
import Inventory from './modules/Inventory/pages/inventoryLanding/InventoryLanding';
import Header from './modules/root/components/header/Header';
import {initialInventoryState, inventoryReducer} from './modules/context/reducer'
import { InventoryContext } from './modules/context/context';
function App() {
  const [state, dispatch] = useReducer(inventoryReducer,initialInventoryState)
  return (
    <InventoryContext.Provider value = {{state, dispatch}}>
    <div className="container">
      <Header/>
      <Inventory/>
    </div>
    </InventoryContext.Provider>
  );
}

export default App;
