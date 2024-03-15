import './FormErrorMessagePhone.scss';
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-24px.svg"

function FormErrorMessagePhone() {

    return (
        <div className='error-message'>
            <ErrorIcon className='error-message__icon'/>
            <p className='error-message__text'>Phone number must follow the format: +1 (###) ###-####</p>
        </div>
        
    );
};

export default FormErrorMessagePhone;