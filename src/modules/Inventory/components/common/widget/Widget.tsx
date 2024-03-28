import React from 'react';
import './Widget.scss';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

interface Props{
    WidgetIcon:any;
    widgetTitle: string;
    widgetValue:string
}
const Widget:React.FC<Props> =({WidgetIcon,widgetTitle,widgetValue})=> {
  return (
    <div className='widget-container'>
     
    <div className='widget-container-wrapper'>
    <div className='widget-container-wrapper-icon'>
         <WidgetIcon/>
        
     </div>
     <div className='widget-container-wrapper-metaInfo'>
     <p className='widget-container-wrapper-metaInfo-label'>{widgetTitle}</p>
     <p className='widget-container-wrapper-metaInfo-value'>{widgetValue}</p>
     </div>
    </div>
    


    </div>
  )
}

export default Widget
