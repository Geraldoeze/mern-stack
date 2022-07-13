import React, {useEffect, useState} from "react";
import { useHttpClient } from '../../shared/hooks/http-hooks';

import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;
    

    useEffect( () => {
        const fetchedPlaces = async () => {
          try {
            const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
            setLoadedPlaces(responseData.places)
            
          }  catch (err) {}
            
        }
        fetchedPlaces();
    }, [sendRequest, userId]);
    
    
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner asOverlay /> }
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
      </React.Fragment>
    )}
 
export default UserPlaces;