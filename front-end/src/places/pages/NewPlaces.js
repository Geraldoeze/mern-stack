import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom'

import "./PlaceForm.css";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { AuthContext } from '../../shared/context/auth-context';

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const {sendRequest, clearError, isLoading, error} = useHttpClient();
    const [formState, inputHandler] = useForm(
      {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

const navigate = useNavigate();

const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
        await sendRequest('http://localhost:5000/api/places', 
        'POST', JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            address: formState.inputs.address.value,
            creator: auth.userId
        }), 
        {
            'Content-Type':'application/json'
        })
        //Redirect the user to a different page
        navigate('/', {replace: true})
    } catch (err) {}
}

return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <form className='place-form' onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
        />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
        />
        <Input
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputHandler}
        /> 

        <Button type="submit" disable={formState.isValid}>
            ADD PLACE
        </Button>
    </form>
    </React.Fragment>    
);
}

export default NewPlace;
