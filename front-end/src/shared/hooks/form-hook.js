import { useCallback, useReducer } from "react"; 


const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                  formIsValid = formIsValid && action.isValid;  
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId] : {value: action.value, isValid: action.isValid }
                },
                isValid : formIsValid
            };
        default:
            return state;
    }
};


//Custom hook always have to start with lowercase used
export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    //Used useCallback to stop infinite loop on useEffect
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE',
        value: value, 
        inputId: id, 
        isValid: isValid });
    }, []);

    return [formState, inputHandler]
}
 
