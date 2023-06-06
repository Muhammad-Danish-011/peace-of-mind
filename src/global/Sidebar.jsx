import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
     const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<HomeIcon/>

        },
        {
            path:"/councler",
            name:"Councler",
            icon:<PsychologyRoundedIcon/>
        },
        {
            path:"/calendar",
            name:"Calendar",
            icon:<CalendarMonthRoundedIcon/>

        },
        {
            path:"/form",
            name:"Form",
            icon:<DescriptionRoundedIcon/>

        }
       
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <ViewSidebarRoundedIcon onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;