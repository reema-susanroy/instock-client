import "./AddInventoryItem.scss";
import { ReactComponent as backIcon } from "../../assets/icons/arrow_back-24px.svg";
// import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

function AddInventoryItem(inventory) {

    // const navigate = useNavigate();

    // const [itemName, setItemName] = useState(inventory.item_name);
    // const [description, setDescription] = useState(inventory.description);
    const [quantity, setQuantity] = useState(inventory.quantity);


    // const [categories, setCategories] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState(inventory.category);
    // const [warehouses, setWarehouses] = useState([]);
    // const [selectedWarehouse, setSelectedWarehouse] = useState(warehouseName);
    const [selectedOption, setSelectedOption] = useState();
    // const [updateSuccess, setUpdateSuccess] = useState("");
    // const [errorMesage, setErrorMessage] = useState(false);


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'Out of Stock') {
            setQuantity(0);
        }
        if (event.target.value === 'In Stock') {
            setQuantity(inventory.quantity);
        }
    };

    // const handleWarehouseChange = (value) => {
    //     setSelectedWarehouse(value);
    // }

    // useEffect(() => {
    //     async function fetchCategories() {
    //         try {
    //             const responseCategories = await axios.get('http://localhost:5000/api/inventories/inventories/categories');
    //             setCategories(responseCategories.data);
    //             const responseWarehouses = await axios.get('http://localhost:5000/api/inventories/inventories/warehouses');
    //             setWarehouses(responseWarehouses.data);
    //         } catch (error) {
    //             console.error('Error fetching inventory details from server:', error);
    //         }
    //     }
    //     fetchCategories();
    // }, []);

    const validateQuantities = () => {
        if (selectedOption === 'In Stock') {
            if (!quantity) {
                return false
            }
        }
        return true;
    }

    // const validateInput = () => {
    //     console.log('1')
    //     console.log(warehouseId, itemName, description, selectedCategory, selectedOption, quantity)
    //     if (!warehouseId || !itemName || !description) {
    //         return false;
    //     }
    //     else
    //         return true;
    // }

    const addItemtoInventory = async (e) => {
        e.preventDefault();
        // const Validation = validateInput();
        // const validateQuantity = validateQuantities();
        // console.log(Validation, validateQuantity)
        // if (Validation && validateQuantity) {
        //     setUpdateSuccess(false);
        //     try {
        //         await axios.put(`http://localhost:5000/api/inventories/${inventory.id}`, {
        //             warehouse_id: warehouseId,
        //             item_name: itemName,
        //             description: description,
        //             category: selectedCategory,
        //             status: selectedOption,
        //             quantity: String(quantity)
        //         });
        //         navigate(`/warehouses/${warehouseId}`)
        //     }
        //     catch (message) {
        //         console.log('Unable to do Update inventory item : ' + message);
        //         setUpdateSuccess(false)
        //     }
        // }
        // else {
        //     setErrorMessage(true);
        // }
    }

    const cancelEdit = (event) => {
        event.preventDefault();
        // navigate(`/inventories/${warehouseId}`)
    }

    return (
        <section className='container'>
            <div className='editInventory'>
                <div className='editInventory__header'>
                    {/* <Link to={`/inventories/${warehouseId}`}>
                        <img className='editInventory__back-arrow' src={backIcon} alt="back-arrow" />
                    </Link> */}
                    <h1>Add New Inventory Item</h1>
                </div>
                {/* <form onSubmit={handleSubmit}> */}
                <form >
                    <section className='editInventory__form'>
                        <div className='editInventory__itemDetails'>
                            <h2 className='edit-warehouse__form-group-one-subtitle'>Item Details</h2>
                            <section className='editInventory__itemDetails__items'>
                                <label className='editInventory__itemDetails__items--label'>Item Name
                                    <input className='editInventory__itemDetails__items--input' type="text"/>
                                        {/* // onChange={(e) => { handleItemNameChange(e.target.value); handleInputChange(); }} /> */}
                                </label>

                                <label className='editInventory__itemDetails__items--label'>Description
                                    <textarea className='editInventory__itemDetails__items--input' type="text" rows={4} placeholder="Please enter a brief item description..." />
                                        {/* // onChange={(e) => { handleDescriptionChange(e.target.value); handleInputChange(); }} /> */}
                                </label>
                                <label className='editInventory__itemDetails__items--label'>Category
                                    {/* <select value={selectedCategory} className='editInventory__itemDetails__items--input checkbox' placeholder="Please select">
                                        {Array.isArray(categories) && categories.map(category => (
                                            <option className='checkbox__options' key={category} value={category}>{category}</option>
                                        ))}
                                    </select> */}
                                <select className='editInventory__itemDetails__items--input checkbox'>
                                <option value="" disabled selected>Please select</option>
                                <option value="accessories">Accessories</option>
                                <option value="apparel">Apparel</option>
                                <option value="electronics">Electronics</option>
                                <option value="gear">Gear</option>
                                <option value="health">Health</option>
                                </select>
                                </label>
                            </section>
                        </div>

                        <div className='editInventory__itemAvailability'>
                            <div className='warehouse_details__header-edit'>
                                <h2 className='edit-warehouse__form-group-one-subtitle'>Item Availability</h2>
                            </div>
                            <label className='editInventory__itemDetails__items--label'>Status

                                <div className='editInventory__itemDetails__items--radio'>
                                    <label type="radio" className={selectedOption !== 'In Stock' ? 'radio-button grey' : 'radio-button'}>
                                        <input className='blue-radio '
                                            type="radio"
                                            value="In Stock"
                                            checked={selectedOption === 'In Stock'}
                                            onChange={handleOptionChange}
                                        />
                                        In Stock
                                    </label>
                                    <label type="radio" className={selectedOption !== 'Out of Stock' ? 'radio-button grey' : 'radio-button'}>
                                        <input className='blue-radio '
                                            type="radio"
                                            value="Out of Stock"
                                            checked={selectedOption === 'Out of Stock'}
                                            onChange={handleOptionChange}
                                        />
                                        Out of Stock
                                    </label>
                                </div>
                                <div className='editInventory__itemDetails__items--radio-quantity'>
                                    {selectedOption === 'In Stock' && (
                                        <div>
                                            <label className='editInventory__itemDetails__items--radio-quantity-label'> Quantity
                                                <input
                                                    type="number"
                                                    className='editInventory__itemDetails__items--input'
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </label>

                            <label className='editInventory__itemDetails__items--label'>Warehouse
                                {/* <select value={selectedWarehouse} className='editInventory__itemDetails__items--input checkbox' placeholder="Please select"
                                    onChange={(e) => handleWarehouseChange(e.target.value)}>
                                    {Array.isArray(warehouses) && warehouses.map(warehouse => (
                                        <option key={warehouse} value={warehouse} >{warehouse}</option>
                                    ))}
                                </select> */}
                                <select className='editInventory__itemDetails__items--input checkbox'>
                                <option value="" disabled selected>Please select</option>
                                <option value="accessories">Manhattan</option>
                                <option value="apparel">Washington</option>
                                <option value="electronics">New Jersey</option>
                                <option value="gear">SF</option>
                                <option value="health">Santa Monica</option>
                                <option value="health">Seattle</option>
                                <option value="health">Miami</option>
                                <option value="health">Boston</option>
                                </select>
                            </label>
                        </div>
                    </section>

                    <section className='modal__button editInventory--button'>
                        <button onClick={cancelEdit} className='modal__button--cancel editInventory--cancel'>Cancel</button>
                        <button onClick={addItemtoInventory} className='modal__button--delete editInventory-save'>Save</button>
                    </section>
                    {/* {errorMesage ? <p className='form_validation'>
                        All fields are required
                    </p> : " "} */}
                </form>
            </div>
        </section>
)};

export default AddInventoryItem;