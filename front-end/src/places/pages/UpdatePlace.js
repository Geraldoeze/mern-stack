import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "./UserPlaces";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card/Card";

const UpdatePlace = () => {
    const [isLoading, setIsLoding] = useState(true)
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData ] = useForm({
        title: {
            value: "",
            isValid: false
        },
        description: {
            value: "",
            isValid: false
        }
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if(identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            });
        }
        setIsLoding(false)
    }, [setFormData, identifiedPlace])
    
    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    if(!identifiedPlace) {
        return <div className="center">
                <Card>
                  <h2>Could not find place</h2>
                </Card>
                </div>
    }

    if(isLoading) {
        return <div className="center">
                  <h2>Loading Places...</h2> 
                </div>
    }
    return ( 
        formState.inputs.title.value && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
               id="title"
               element="input"  
               type="text"
               label="Title"
               validators={[VALIDATOR_REQUIRE()]}
               errorText="PLease Enter a valid title."
               onInput={inputHandler}
               initialValue={formState.inputs.title.value}
               intialValid={formState.inputs.title.isValid}
            />
              <Input 
               id="description"
               element="textarea"
               label="Description"  
               validators={[VALIDATOR_MINLENGTH(5)]}
               errorText="PLease Enter a valid description (min. 5 characters)."
               onInput={inputHandler}
               initialValue={formState.inputs.description.value}
               initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    );
}
 
export default UpdatePlace;