import React from 'react';
import './App.scss';
import Inventory from './modules/Inventory/pages/inventoryLanding/InventoryLanding';
import Header from './modules/root/components/header/Header';

function App() {
  return (
    <div className="container">
      <Header/>
      <Inventory/>
    </div>
  );
}

export default App;
