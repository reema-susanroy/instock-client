import './EditWarehousePage.scss'
import ArrowBack from "../../assets/icons/arrow_back-24px.svg";
import { useState } from 'react';

function EditWarehousePage(){
    const [formData, setFormData] = useState({
        warehouse_name: '',
        address: '',
        city: '',
        country: '',
        contact_name: '',
        contact_position: '',
        contact_phone: '',
        contact_email: ''
      });
    
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSave = (event) => {
        event.preventDefault();
        // handle form submission
        console.log('Form data saved:', formData);
      };

      const handleCancel = (event) => {
        event.preventDefault();
        // handle form reset
        setFormData({
          warehouse_name: '',
          address: '',
          city: '',
          country: '',
          contact_name: '',
          contact_position: '',
          contact_phone: '',
          contact_email: ''
        });
        console.log('Form data cleared');
      };
    

    return(
        <body>
        <section className="edit-warehouse">
            <div className="edit-warehouse__title">
                <img className='edit-warehouse__title-icon' src={ArrowBack} alt='Arrow Back for Edit'/>
                <h1 className="edit-warehouse__title-display">Edit Warehouse</h1>
            </div>

            <article className="edit-warehouse__details">
                <form onSubmit={handleSave} className="edit-warehouse__form">
                    <div className="edit-warehouse__form-group-one">
                    <h2 className="edit-warehouse__form-group-one-subtitle">Warehouse Details</h2>
                        <label htmlFor="warehouse_name" className='edit-warehouse__form-group-one-label'>Warehouse Name</label>
                        <input 
                            id="warehouse_name" 
                            name="warehouse_name" 
                            placeholder='Washington' 
                            className="edit-warehouse__form-group-one-input"
                            onChange={handleInputChange}
                        />

                        <label htmlFor="address" className='edit-warehouse__form-group-one-label'>Street Address</label>
                        <input 
                            id="address" 
                            name="address" 
                            placeholder='300 Pearl Street SW' 
                            className="edit-warehouse__form-group-one-input"
                            onChange={handleInputChange}
                        />

                        <label htmlFor="city" className='edit-warehouse__form-group-one-label'>City</label>
                        <input 
                            id="city" 
                            name="city" 
                            placeholder='Washington' 
                            className="edit-warehouse__form-group-one-input"
                            onChange={handleInputChange}
                        />

                        <label htmlFor="country" className='edit-warehouse__form-group-one-label'>Country</label>
                        <input 
                            id="country" 
                            name="country" 
                            placeholder='USA' 
                            className="edit-warehouse__form-group-one-input"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="edit-warehouse__form-group-two">
                    <h2 className="edit-warehouse__form-group-two-subtitle">Contact Details</h2>
                        <label htmlFor="contact_name" className='edit-warehouse__form-group-two-label'>Contact Name</label>
                        <input 
                            id="contact_name" 
                            name="contact_name" 
                            placeholder='Graeme Lyon' 
                            className="edit-warehouse__form-group-two-input"
                            onChange={handleInputChange}
                        />

                        <label htmlFor="contact_position" className='edit-warehouse__form-group-two-label'>Position</label>
                        <input 
                            id="contact_position" 
                            name="contact_position" 
                            placeholder='Warehouse Manager' 
                            className="edit-warehouse__form-group-two-input"
                            onChange={handleInputChange}
                        />

                        <label htmlFor="contact_phone" className='edit-warehouse__form-group-two-label'>Phone number</label>
                        <input 
                            id="contact_phone" 
                            name="contact_phone" 
                            placeholder='+1 (647) 504-0911' 
                            className="edit-warehouse__form-group-two-input"
                            onChange={handleInputChange}
                        />

                        <label htmlFor="contact_email" className='edit-warehouse__form-group-two-label'>Email</label>
                        <input 
                            id="contact_email" 
                            name="contact_email" 
                            placeholder='glyon@instock.com' 
                            className="edit-warehouse__form-group-two-input"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='edit-warehouse__button'>
                        <button type='button' onClick={handleCancel} className="edit-warehouse__button-cancel">Cancel</button>
                        <button type='button' onClick={handleSave} className="edit-warehouse__button-save">Save</button>
                    </div>
                </form>
            </article>
        </section>
        </body>

    )
}

export default EditWarehousePage;