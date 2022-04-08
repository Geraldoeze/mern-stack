import React from "react";
import { OutletProps } from "react-router-dom";

import './MainHeader.css';

const MainHeader = (props) => {
    return ( 
        <header className="main-header">
            {props.children}
        </header>
     );
}
 
export default MainHeader;