import React from "react";
import './UserList.css';



const UserList = (props) => {
    if (props.items.length === 0) {
        return ( 
            <div className="center">
                <h2>NO User found</h2>
            </div>
         );
    }
    
}
 
export default UserList;