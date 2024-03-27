import React from 'react';
import './Header.scss';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ToggleButton from '../toggleButton/ToggleButton';
const Header: React.FC = () => {
  return (
    <div className='header'>
     <div className='header-container'>
     <ToggleButton/>
      <LogoutOutlinedIcon className='header-container-logout'/>
     </div>
    </div>
  );
};

export default Header;
