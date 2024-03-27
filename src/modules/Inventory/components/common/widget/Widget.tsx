import React from 'react';
import './Widget.scss';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

interface Props{
    WidgetIcon?:any;
    widgetTitle?: string;
    widgetValue?:number
}
const Widget:React.FC<Props> =(props)=> {
  return (
    <div className='widget-container'>
     
     <div className='widget-container-icon'>
         <LogoutOutlinedIcon/>
        
     </div>
     <div className='widget-container-metaInfo'>
     <p className='widget-container-metaInfo-label'>Total Product value</p>
     <p className='widget-container-metaInfo-value'>2</p>
     </div>
    


    </div>
  )
}

export default Widget
