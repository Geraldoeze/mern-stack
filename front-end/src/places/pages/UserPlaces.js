import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
    {
        id: 'p01',
        title: 'Empire State',
        description: 'An AMazing building',
        imageUrl: 'https://th.bing.com/th/id/OIP.XHgMmwl_hhDHI3h5O5sWLAHaF1?pid=ImgDet&w=189&h=148&c=7',
        address: 'NEW YORK STATE',
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
        imageUrl: 'https://th.bing.com/th/id/OIP.XHgMmwl_hhDHI3h5O5sWLAHaF1?pid=ImgDet&w=189&h=148&c=7',
        address: 'NEW YORK',
        location: {
            lat: 40.7484405,
            lng: -73.9878
        },
        creator: 'se2'
    },
    {
        id: 'p13',
        title: 'Empire State',
        description: 'An AMazing building',
        imageUrl: 'https://th.bing.com/th/id/OIP.XHgMmwl_hhDHI3h5O5sWLAHaF1?pid=ImgDet&w=189&h=148&c=7',
        address: 'Wall Street',
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