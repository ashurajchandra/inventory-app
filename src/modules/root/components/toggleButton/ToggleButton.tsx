import React, { useContext, useState } from 'react';
import { setIsAdmin } from '../../../context/action';
import { InventoryContext } from '../../../context/context';
import './ToggleButton.scss'; 

const ToggleButton: React.FC = () => {
  const {state, dispatch} = useContext(InventoryContext)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleMode = () => {
    dispatch(setIsAdmin(!state.isAdmin))
  };

  return (
    <div className='toggle'>
      <p>admin</p>
     <div className={`toggle-container ${state.isAdmin ? 'toggle-container-light' : 'toggle-container-dark'}`} onClick={toggleMode}>
      <div className="toggle-button"></div>
    </div>
    <p>user</p>
    </div>
   
  );
};

export default ToggleButton;
