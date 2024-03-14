import './FormErrorMessage.scss';
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-24px.svg"

function FormErrorMessage() {

    return (
        <div className='error-message'>
            <ErrorIcon className='error-message__icon'/>
            <p className='error-message__text'>This Field is Required</p>
        </div>
        
    );
};

export default FormErrorMessage;