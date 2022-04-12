import React from "react";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State',
        description: 'An AMazing building',
        imageUrl: '',
        address: '',
        location: {
            lat: 40.7484405,
            lng: -73.9878
        },
        creator: 'u2'
    },
    {
        id: 'p3',
        title: 'Empire State',
        description: 'An AMazing building',
        imageUrl: '',
        address: '',
        location: {
            lat: 40.7484405,
            lng: -73.9878
        },
        creator: 'u4'
    }
]

const UserPlaces = () => {

    return <PlaceList items={DUMMY_PLACES} />
}
 
export default UserPlaces;