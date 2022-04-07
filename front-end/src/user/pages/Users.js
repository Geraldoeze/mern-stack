import React from "react";
import UserList from "../components/UserList";


const Users = () => {
    const USERS = [{
        id: 'se2',
        name: 'Gerald',
        places: 4,
        image: 'lion.jpg'
    }];
    return <UserList items={USERS}/>
        
}
 
export default Users;