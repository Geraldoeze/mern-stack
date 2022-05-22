import React, {useState} from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MIN, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";


const Auth = () => {

    const [isLoginMode, setIsLoginMode] = useState(true);

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

      const authSubmitHandler = event => {
          event.preventDefault()
          console.log(formState.inputs)
      }
  
    return <Card className="authentication">
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