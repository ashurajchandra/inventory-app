import React, { useState } from 'react';
import './ToggleButton.scss'; 

const ToggleButton: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className='toggle'>
      <p>admin</p>
     <div className={`toggle-container ${isDarkMode ? 'toggle-container-dark' : 'toggle-container-light'}`} onClick={toggleMode}>
      <div className="toggle-button"></div>
    </div>
    <p>user</p>
    </div>
   
  );
};

export default ToggleButton;
