import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

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
        id: 'p12',
        title: 'Empire States',
        description: 'An AMAzing building',
        imageUrl: '',
        address: '',
        location: {
            lat: 40.7484405,
            lng: -73.9878
        },
        creator: 'u12'
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
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
    return <PlaceList items={loadedPlaces} />
}
 
export default UserPlaces;