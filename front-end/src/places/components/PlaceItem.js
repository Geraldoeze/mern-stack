import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import './PlaceItem.css'
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hooks";

const PlaceItem = (props) => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext)
    const [ showMap, setShowMap ]  = useState(false);
    const [showConfirmM, setShowConfirmM] = useState(false);
    
    const openMapHandler = () => setShowMap(true)

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmM(true)
    } 

    const cancelDeleteHandler = () => {
        setShowConfirmM(false)
    }

    const confirmDeleteHandler = async () => {
        setShowConfirmM(false);
        try {
            await sendRequest(`http://localhost:5000/api/places${props.id}`,'DELETE');
            props.onDelete(props.id);
        } catch (err) {}
        
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
        <Modal 
          show={showMap}
          onCancel={closeMapHandler}
          header={props.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
            <div className="map-container">
                <Map center={props.coordinates} zoom={15} />
            </div>
        </Modal>  
        <Modal 
            show={showConfirmM}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions" 
            footer={
                 <React.Fragment>
                     <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                     <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                 </React.Fragment>
            }
        >
            <p>Do you want to proceed and delete this place? Please note that it can't be undone </p>
        </Modal>
        <li className="place-item">
            <Card className="place-item__content">
              {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="place-item__info">
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
                <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                {auth.isLoggedIn && (
                   <Button to={`/places/${props.id}`}>EDIT</Button> 
                )}
                {auth.isLoggedIn && (
                   <Button danger onClick={showDeleteWarningHandler}>DELETE</Button> 
                )}
                
            </div>
            </Card>
        </li>
        </React.Fragment>
     );
}
 
export default PlaceItem; 