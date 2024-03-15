import './EditWarehousePage.scss'
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import errorIcon from '../../assets/icons/error-24px.svg';

function EditWarehousePage(){
    const { warehouseId } = useParams();
    const [warehouses, setWarehouses] = useState([]);
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [dataFetched, setDataFetched] = useState(false);
    
    const base_url = 'http://localhost:5000';


    console.log(warehouses);
    console.log(warehouseId);
    console.log(formData)
    
    useEffect(() => {
        getWarehouses();
        
      }, []);
    
      const getWarehouses = async () => {
        try {
            const response = await axios.get(`${base_url}/api/warehouses`);
            setWarehouses(response.data);
            setDataFetched(true);
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to fetch data");
        }
      };

    
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
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };

      console.log(formData);
    
      const handleSave = async (event) => {
        event.preventDefault();

         // Form validation
         if (
            !formData.warehouse_name ||
            !formData.address ||
            !formData.city ||
            !formData.country ||
            !formData.contact_name ||
            !formData.contact_position ||
            !formData.contact_phone ||
            !formData.contact_email
        ) {
            setErrorMessage('All fields are required');
            return;
        }

        // Validate email using the validator library
        if (!validator.isEmail(formData.contact_email)) {
            setErrorMessage('Invalid email format');
            setTimeout(() => {
                setErrorMessage('');
                navigate(`/warehouses/${formData.id}/edit`);
            }, 2000); 
            return;
        }

        // Validate phone number using regular expression
        const phoneRegex = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
        if (!phoneRegex.test(formData.contact_phone)) {
            setErrorMessage('Invalid phone number format');
            setTimeout(() => {
                setErrorMessage('');
                navigate(`/warehouses/${formData.id}/edit`);
            }, 2000); 
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
        // reset form data
        // setFormData({});
        console.log('Form data cleared');

        // setTimeout(() => {
            navigate(`/warehouses/${warehouseId}`);
        // }, 2000); 
    };

    if (errorMessage) {
        return <div>{errorMessage}</div>;
      }
    
      if (!formData) {
        return <div>Loading...</div>;
      }
    

    return(
        <>
        <section className="edit-warehouse">
            <div className="edit-warehouse__title">
                <Link to={`/warehouses/${formData.id}`}>
                    <img className='edit-warehouse__title-icon' src={ArrowBack} alt='Arrow Back for Edit'/>
                </Link>
                <h1 className="edit-warehouse__title-display">Edit Warehouse</h1>
            </div>

            <article className="edit-warehouse__details">
                <form onSubmit={handleSave} className="edit-warehouse__form">
                    <div className='edit-warehouse__form-input-wrapper'>
                        <div className="edit-warehouse__form-group-one">
                        <h2 className="edit-warehouse__form-group-one-subtitle">Warehouse Details</h2>
                            <label htmlFor="warehouse_name" className='edit-warehouse__form-group-one-label'>
                                    Warehouse Name
                            </label>
                            <input 
                                id="warehouse_name" 
                                name="warehouse_name" 
                                value={formData.warehouse_name || ''}
                                className="edit-warehouse__form-group-one-input"
                                onChange={handleInputChange}
                            />
                            {!formData.warehouse_name && (
                                <div className='error'>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon' />
                                    <span className="error-text">This field is required</span>
                                </div>
                            )}

                            <label htmlFor="address" className='edit-warehouse__form-group-one-label'>
                                Street Address
                            </label>
                            <input 
                                id="address" 
                                name="address" 
                                value={formData.address || ''}
                                className="edit-warehouse__form-group-one-input"
                                onChange={handleInputChange}
                            />
                            {!formData.address && (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon'/>
                                    <span className="error-text">This field is required</span>
                                </>
                            )}

                            <label htmlFor="city" className='edit-warehouse__form-group-one-label'>
                                City
                            </label>
                            <input 
                                id="city" 
                                name="city" 
                                value={formData.city || ''}
                                className="edit-warehouse__form-group-one-input"
                                onChange={handleInputChange}
                            />
                            {!formData.city && (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon' />
                                    <span className="error-text">This field is required</span>
                                </>
                    )}

                            <label htmlFor="country" className='edit-warehouse__form-group-one-label'>
                                Country
                            </label>
                            <input 
                                id="country" 
                                name="country" 
                                value={formData.country || ''}
                                className="edit-warehouse__form-group-one-input"
                                onChange={handleInputChange}
                            />
                            {!formData.country && (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon'/>
                                    <span className="error-text">This field is required</span>
                                </>
                            )}
                        </div>

                        <div className="edit-warehouse__form-group-two">
                        <h2 className="edit-warehouse__form-group-two-subtitle">Contact Details</h2>
                            <label htmlFor="contact_name" className='edit-warehouse__form-group-two-label'>
                                Contact Name
                            </label>
                            <input 
                                id="contact_name" 
                                name="contact_name" 
                                value={formData.contact_name || ''}
                                className="edit-warehouse__form-group-two-input"
                                onChange={handleInputChange}
                            />
                            {!formData.contact_name && (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon' />
                                    <span className="error-text">This field is required</span>
                                </>
                            )}

                            <label htmlFor="contact_position" className='edit-warehouse__form-group-two-label'>
                                Position
                            </label>
                            <input 
                                id="contact_position" 
                                name="contact_position"
                                value={formData.contact_position || ''}
                                className="edit-warehouse__form-group-two-input"
                                onChange={handleInputChange}
                            />
                            {!formData.contact_position && (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon' />
                                    <span className="error-text">This field is required</span>
                                </>
                            )}

                            <label htmlFor="contact_phone" className='edit-warehouse__form-group-two-label'>
                                Phone number
                            </label>
                            <input 
                                id="contact_phone" 
                                name="contact_phone" 
                                value={formData.contact_phone || ''}
                                className="edit-warehouse__form-group-two-input"
                                onChange={handleInputChange}
                            />
                            {!formData.contact_phone&& (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon' />
                                    <span className="error-text">This field is required</span>
                                </>
                            )}

                            <label htmlFor="contact_email" className='edit-warehouse__form-group-two-label'>
                                Email
                            </label>
                            <input 
                                id="contact_email" 
                                name="contact_email" 
                                value={formData.contact_email || ''}
                                className="edit-warehouse__form-group-two-input"
                                onChange={handleInputChange}
                            />
                            {!formData.contact_email && (
                                <>
                                    <img src={errorIcon} className="error-icon" alt='Error Icon' />
                                    <span className="error-text">This field is required</span>
                                </>
                            )}
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