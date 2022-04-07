import React from "react";
import UserList from "../components/UserList";


const Users = () => {
    const USERS = [{
        id: 'se2',
        name: 'Gerald',
        places: 4,
        image: 'https://media.istockphoto.com/photos/beautiful-lion-romeo-2-in-masai-mara-kenya-picture-id533310019?k=20&m=533310019&s=612x612&w=0&h=Sghtb85oY0anV5syGX912ewWAqBugWq9ljLahqZAgY8='
    }];
    return <UserList items={USERS}/>
        
}
 
export default Users;