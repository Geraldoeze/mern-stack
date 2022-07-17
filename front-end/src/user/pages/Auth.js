import React, {useState, useContext} from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ImageUpload from "../../shared/components/FormElements/Image";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
                 name: undefined,
                 image: undefined
             }, formState.inputs.email.isValid && formState.inputs.password.isValid)
         } else {
             setFormData({
                 ...formState.inputs,
                 name: { 
                     value: '',
                     isValid: false
                 },
                 image: {
                   value: null,
                   isValid: false
                 }
             } , false);
         } 
         
         setIsLoginMode((prevMode) => !prevMode);
      };
        

    const authSubmitHandler = async event => {
          event.preventDefault();

          console.log(formState.inputs)
          if (isLoginMode) {
            try {
                const responseData = await sendRequest("http://localhost:5000/api/users/login",
                   'POST',
                   JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                  }),
                   { 
                     'Content-Type': 'application/json'
                   }                
               );
   
               
               auth.login(responseData.user.id);
               } catch (err) {}
           
          } else {
            try {
            const responseData = await sendRequest("http://localhost:5000/api/users/signup",
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                  }),
                { 
                  'Content-Type': 'application/json'
                },
                
            );

            auth.login(responseData.user.id);
            } catch (err) {
                
            }
        };

    }
  
    // const errorHandler = () => {
    //     clearError();
    // };

    return (
     <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
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
            {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} />}
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
     </React.Fragment>
    )
}
 
export default Auth;