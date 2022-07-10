import React, {useState, useContext} from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
          email: {
              value: '', 
              isValid: false
          },
          password: {
              value: '',
              isValid: false
          }
      }, false); 

    const switchModeHandler = () => {
         if (!isLoginMode) {
             setFormData(
            {
                ...formState.inputs,
                 name: undefined
             }, formState.inputs.email.isValid && formState.inputs.password.isValid)
         } else {
             setFormData({
                 ...formState.inputs,
                 name: {
                     value: '',
                     isValid: false
                 }
             } , false);
         } 
         
         setIsLoginMode((prevMode) => !prevMode);
      };
        console.log(isLoginMode)
    const authSubmitHandler = async event => {
          event.preventDefault();

          if (isLoginMode) {
            
          } else {
            try {
             setIsLoading(true);
             const response = await fetch("http://localhost:5000/api/users/signup", {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name: formState.inputs.name.value,
                  email: formState.inputs.email.value,
                  password: formState.inputs.password.value,
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            setIsLoading(false);
            auth.login();
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || 'Somethimg went wrong');
            }
        }

    }
  
      
    return <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay /> }
        <h2> Login Required</h2> 
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input 
                element="input" 
                id="name" 
                type="text" 
                label="Your Name" 
                validators={[VALIDATOR_REQUIRE()]} 
                errorText="Please enter a name"
                onInput={inputHandler}
              />
            )}
           <Input 
                id="email"
                element="input"
                type="email"
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid Email Address."
                onInput={inputHandler}
           />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_MIN(6)]}
                errorText="Password is too short(min. 6)."
                onInput={inputHandler}
            />
            <Button
              type="submit" 
              disable={!formState.isValid}
            >{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
            <Button 
              type="button"
              inverse 
              onClick={switchModeHandler} 
            >SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>
        </form>
    </Card>
}
 
export default Auth;