import './EditWarehousePage.scss'
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import errorIcon from '../../assets/icons/error-24px.svg';
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import FormErrorMessageEmail from "../../components/FormErrorMessageEmail/FormErrorMessageEmail";
import FormErrorMessagePhone from "../../components/FormErrorMessagePhone/FormErrorMessagePhone";


function EditWarehousePage() {
    const { warehouseId } = useParams();
    const [warehouses, setWarehouses] = useState([]);
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [dataFetched, setDataFetched] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [warehouseNameError, setWarehouseNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [cityError, setCityError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [contactNameError, setContactNameError] = useState("");
    const [contactPositionError, setContactPositionError] = useState("");
    const [activeField, setActiveField] = useState(null);


    const base_url = 'http://localhost:5000';

    // Set page title
    useEffect(() => {
        document.title = "Edit Warehouse";
    }, []);

    // fetch warehouse list from database
    useEffect(() => {
        const getWarehouses = async () => {
            try {
                const response = await axios.get(`${base_url}/api/warehouses`);
                setWarehouses(response.data);
                setDataFetched(true);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Failed to fetch data");
                setIsLoading(false);
            }
        };
        getWarehouses();
    }, []);


    useEffect(() => {
        // Find the warehouse with the matching ID from the list of warehouses
        if (dataFetched) {
            const warehouse = warehouses.find(warehouse => warehouse.id === parseInt(warehouseId));
            if (warehouse) {
                setFormData(warehouse);
            } else {
                setErrorMessage("Warehouse not found. Redirecting to warehouses page...");
                setTimeout(() => {
                    navigate('/warehouses');
                }, 3000);
            }
        }
    }, [warehouseId, warehouses, navigate, dataFetched]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
    };

    const formValidator = (formData) => {
        // Reset error states
        setEmailError("");
        setPhoneError("");
        setWarehouseNameError("");
        setAddressError("");
        setCityError("");
        setContactNameError("");
        setContactPositionError("");
        setCountryError("");
    
        let isValid = true;
    
        // Check if fields are empty
        if ( !formData.warehouse_name) {
          setWarehouseNameError("Warehouse Name field required");
          isValid = false;
        }
        if (!formData.address) {
          setAddressError("Address field required");
          isValid = false;
        }
        if ( !formData.city ) {
          setCityError("City field required");
          isValid = false;
        }
        if (!formData.contact_name) {
          setContactNameError("Contact Name field required");
          isValid = false;
        }
        if (!formData.contact_position) {
          setContactPositionError("Contact position field required");
          isValid = false;
        }
        if (!formData.country) {
          setCountryError("country field required");
          isValid = false;
        }
    
        // Validate email using the validator library
        if (!validator.isEmail(formData.contact_email)) {
          setEmailError("Invalid email format");
          isValid = false;
        }
        // Validate phone number using regular expression
        const phoneRegex = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
        if (!phoneRegex.test(formData.contact_phone)) {
          setPhoneError("Invalid phone number format");
          isValid = false;
        }
    
        return isValid;
      };
    

    const handleSave = async (event) => {
        event.preventDefault();
        // Validate the form data
        const isValid = formValidator(formData);

        if (!isValid) {
            // Form validation failed, do not proceed with submission
            console.log("Form validation failed!");
            return;
          }

        try {
            await axios.put(`${base_url}/api/warehouses/${warehouseId}`, {
                warehouse_name: formData.warehouse_name,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                contact_name: formData.contact_name,
                contact_position: formData.contact_position,
                contact_phone: formData.contact_phone,
                contact_email: formData.contact_email
            });

            console.log('Warehouse updated successfully');
            navigate('/warehouses');
        }
        catch (error) {
            console.log("Unable to update warehouse : ", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate(`/warehouses/${warehouseId}`);
    };

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (!formData) {
        return <div>Loading...</div>;
    }

    // called when a field is receives focus, takes parameter 'field' which connects to the field name.
    // Then it sets the activeField state to the value of the field parameter
    const handleFocus = (field) => {
        setActiveField(field);
        // Clear error for the active field
        switch (field) {
        case "warehouse-name":
            setWarehouseNameError("");
            break;
        case "street-address":
            setAddressError("");
            break;
        case "city":
            setCityError("");
            break;
        case "country":
            setCountryError("");
            break;
        case "contact-name":
            setContactNameError("");
            break;
        case "position":
            setContactPositionError("");
            break;
        case "phone-number":
            setPhoneError("");
            break;
        case "email":
            setEmailError("");
            break;
        default:
            break;
        }
    };

    // resets the active field to null when a user clicks away from it and is no
    // longer focused on it.
    const handleBlur = () => {
        setActiveField(null);
    };


    return (
        <>
            <section className="edit-warehouse">
                <div className="edit-warehouse__title">
                    <Link to={`/warehouses/${formData.id}`}>
                        <img className='edit-warehouse__title-icon' src={ArrowBack} alt='Arrow Back for Edit' />
                    </Link>
                    <h1 className="edit-warehouse__title-display">Edit Warehouse</h1>
                </div>

                <article className="edit-warehouse__details">
                    <form 
                        onSubmit={handleSave} 
                        className="edit-warehouse__form"
                        >
                        <div className='edit-warehouse__form-input-wrapper'>
                            <div className="edit-warehouse__form-group-one">
                                <h2 className="edit-warehouse__form-group-one-subtitle">Warehouse Details</h2>
                                <label htmlFor="warehouse_name" className='edit-warehouse__form-group-one-label'>
                                    Warehouse Name
                                </label>
                                <input
                                    type='text'
                                    id="warehouse_name"
                                    name="warehouse_name"
                                    value={formData.warehouse_name || ''}  
                                    className={`
                                                edit-warehouse__form-group-one-input 
                                                ${activeField === "warehouse_name" ? "active" : ""} 
                                                ${formData.warehouse_name === "" && activeField !== "warehouse_name" ? "error" : ""}
                                                `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus('warehouse-name')}
                                    onBlur={handleBlur}
                                />
                                {warehouseNameError && (
                                    <FormErrorMessage message={warehouseNameError} />
                                )}               

                                <label htmlFor="address" className='edit-warehouse__form-group-one-label'>
                                    Street Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type='text'
                                    value={formData.address || ''}
                                    className={`
                                        edit-warehouse__form-group-one-input 
                                        ${activeField === "address" ? "active" : ""}
                                        ${formData.address === "" && activeField !== "address" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("address")}
                                    onBlur={handleBlur}
                                />
                                {addressError && <FormErrorMessage message={addressError} />}

                                <label htmlFor="city" className='edit-warehouse__form-group-one-label'>
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type='text'
                                    value={formData.city || ''}
                                    className={`
                                        edit-warehouse__form-group-one-input 
                                        ${activeField === "city" ? "active" : ""}
                                        ${formData.city === "" && activeField !== "city" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("city")}
                                    onBlur={handleBlur}
                                />
                                {cityError && <FormErrorMessage message={cityError} />}

                                <label htmlFor="country" className='edit-warehouse__form-group-one-label'>
                                    Country
                                </label>
                                <input
                                    id="country"
                                    name="country"
                                    type='text'
                                    value={formData.country || ''}
                                    className={`
                                        edit-warehouse__form-group-one-input 
                                        ${activeField === "country" ? "active" : ""}
                                        ${formData.country === "" && activeField !== "country" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("country")}
                                    onBlur={handleBlur}
                                />
                                {countryError && <FormErrorMessage message={countryError} />}
                            </div>

                            <div className="edit-warehouse__form-group-two">
                                <h2 className="edit-warehouse__form-group-two-subtitle">Contact Details</h2>
                                <label htmlFor="contact_name" className='edit-warehouse__form-group-two-label'>
                                    Contact Name
                                </label>
                                <input
                                    id="contact_name"
                                    name="contact_name"
                                    type='text'
                                    value={formData.contact_name || ''}
                                    className={`
                                        edit-warehouse__form-group-two-input 
                                        ${activeField === "contact_name" ? "active" : ""}
                                        ${formData.contact_name === "" && activeField !== "contact_name" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("contact_name")}
                                    onBlur={handleBlur}
                                />
                                {contactNameError && (
                                    <FormErrorMessage message={contactNameError} />
                                )}

                                <label htmlFor="contact_position" className='edit-warehouse__form-group-two-label'>
                                    Position
                                </label>
                                <input
                                    id="contact_position"
                                    name="contact_position"
                                    type='text'
                                    value={formData.contact_position || ''}
                                    className={`
                                        edit-warehouse__form-group-two-input 
                                        ${activeField === "contact_position" ? "active" : ""}
                                        ${formData.contact_position === "" && activeField !== "contact_position" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("contact_position")}
                                    onBlur={handleBlur}
                                />
                                {contactPositionError && (
                                    <FormErrorMessage message={contactPositionError} />
                                )}

                                <label htmlFor="contact_phone" className='edit-warehouse__form-group-two-label'>
                                    Phone number
                                </label>
                                <input
                                    id="contact_phone"
                                    name="contact_phone"
                                    type='text'
                                    value={formData.contact_phone || ''}
                                    className={`
                                        edit-warehouse__form-group-two-input 
                                        ${activeField === "contact_phone" ? "active" : ""}
                                        ${formData.contact_phone === "" && activeField !== "contact_phone" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("contact_phone")}
                                    onBlur={handleBlur}
                                />
                                {phoneError && <FormErrorMessagePhone message={phoneError} />}

                                <label htmlFor="contact_email" className='edit-warehouse__form-group-two-label'>
                                    Email
                                </label>
                                <input
                                    id="contact_email"
                                    name="contact_email"
                                    type='text'
                                    value={formData.contact_email || ''}
                                    className={`
                                        edit-warehouse__form-group-two-input 
                                        ${activeField === "contact_email" ? "active" : ""}
                                        ${formData.contact_email === "" && activeField !== "contact_email" ? "error" : ""}
                                        `}
                                    onChange={handleInputChange}
                                    onFocus={() => handleFocus("contact_email")}
                                    onBlur={handleBlur}
                                />
                                {emailError && <FormErrorMessageEmail message={emailError} />}
                            </div>
                        </div>

                        <div className='edit-warehouse__button'>
                            <button type='button' onClick={handleCancel} className="edit-warehouse__button-cancel">Cancel</button>
                            <button type='submit' className="edit-warehouse__button-save">Save</button>
                        </div>
                    </form>
                </article>
            </section>
        </>

    )
}

export default EditWarehousePage;