import './FormErrorMessageEmail.scss';
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-24px.svg"

function FormErrorMessageEmail() {

    return (
        <div className='error-message'>
            <ErrorIcon className='error-message__icon'/>
            <p className='error-message__text'>Email format is invalid</p>
        </div>
        
    );
};

export default FormErrorMessageEmail;