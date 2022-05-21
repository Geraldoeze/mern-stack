import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MIN } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card/Card";


const Auth = () => {

    const [formState, inputHandler] = useForm(
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

      const authSubmitHandler = event => {
          event.preventDefault()
          console.log(formState.inputs)
      }
  
    return <Card className="authentication">
        <h2> Login Required</h2> 
        <hr />
        <form onSubmit={authSubmitHandler}>
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
            <Button type="submit" disable={!formState.isValid}>LOGIN</Button>
        </form>
    </Card>
}
 
export default Auth;