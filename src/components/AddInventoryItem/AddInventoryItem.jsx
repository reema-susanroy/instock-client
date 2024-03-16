import "./AddInventoryItem.scss";
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function AddInventoryItem( ) {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [stockOption, setStockOption] = useState();
    const [quantity, setQuantity] = useState("");
    
    const [errorMessage, setErrorMessage] = useState(false);

    const handleItemNameChange = (value) => {
        setItemName(value);
    };

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleCategoriesChange = (value) => {
        setSelectedCategory(value);
    }

    const handleOptionChange = (event) => {
        setStockOption(event.target.value);
        if (event.target.value === 'Out of Stock') {
            setQuantity(0);
        }
        if (event.target.value === 'In Stock') {
            setQuantity(1);
        }
    };

    const handleWarehouseChange = (value) => {
        setSelectedWarehouse(value);
    }

    useEffect(() => {
        async function fetchCategories() {
            try {
                const responseCategories = await axios.get('http://localhost:5000/api/inventories/categories');
                setCategories(responseCategories.data);
                const responseWarehouses = await axios.get('http://localhost:5000/api/inventories/warehouses');
                setWarehouses(responseWarehouses.data);
            } catch (error) {
                console.error('Error fetching inventory details from server:', error);
            }
        }
        fetchCategories();
    }, []);

    const validateQuantities = () => {
        if (stockOption === 'In Stock') {
            if (!Number.isInteger(parseInt(quantity, 10))) {
                return false
            }
        }
        return true;
    }

    const validateInput = () => {
        if (!itemName || !description || !selectedCategory || !selectedWarehouse) {
            return false;
        }
        return true;
    }

    const addItemToInventory = async (e) => {
        e.preventDefault();
        const isValidInput = validateInput();
        const isValidQuantity = validateQuantities();

        if (isValidInput && isValidQuantity) {
            try {
                const warehouse = await axios.get(`http://localhost:5000/api/warehouses/name/${selectedWarehouse}`);
                const warehouseId = warehouse.data.id;
                if (!Number.isInteger(parseInt(warehouseId, 10))) {
                    throw new Error('Invalid warehouse ID');
                }
                await axios.post(`http://localhost:5000/api/inventories/`, {
                    warehouse_id: warehouseId,
                    item_name: itemName,
                    description: description,
                    category: selectedCategory,
                    status: stockOption,
                    quantity: String(quantity)
                });
                navigate(`/inventory`)
            }
            catch (message) {
                console.log('Unable to do Update inventory item : ' + message);
            }
        }
        else {
            setErrorMessage(true);
        }
    }

    const cancelEdit = (event) => {
        event.preventDefault();
        navigate(`/inventories`)
    }

    return (
        <section className='container'>
            <div className='editInventory'>
                <div className='editInventory__header'>
                    <Link to={`/inventories`}>
                        <img className='editInventory__back-arrow' src={backIcon} alt="back-arrow" />
                    </Link>
                    <h1>Add New Inventory Item</h1>
                </div>
                {/* <form onSubmit={handleSubmit}> */}
                <form >
                    <section className='editInventory__form'>
                        <div className='editInventory__itemDetails'>
                            <h2 className='edit-warehouse__form-group-one-subtitle'>Item Details</h2>
                            <section className='editInventory__itemDetails__items'>
                                <label className='editInventory__itemDetails__items--label'>Item Name
                                    <input className='editInventory__itemDetails__items--input' type="text" onChange={(e) => { handleItemNameChange(e.target.value); }}/>
                                </label>

                                <label className='editInventory__itemDetails__items--label'>Description
                                    <textarea className='editInventory__itemDetails__items--input' type="text" rows={4} placeholder="Please enter a brief item description..." onChange={(e) => { handleDescriptionChange(e.target.value); }} />
                                </label>
                                <label className='editInventory__itemDetails__items--label'>Category
                                    <select value={selectedCategory} className='editInventory__itemDetails__items--input checkbox' onChange={(e) => { handleCategoriesChange(e.target.value); }}>
                                    <option value="" disabled selected>Please select</option>
                                        {Array.isArray(categories) && categories.map(category => (
                                            <option className='checkbox__options' key={category} value={category}>{category}</option>
                                        ))}
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
                                    <label type="radio" className={stockOption !== 'In Stock' ? 'radio-button grey' : 'radio-button'}>
                                        <input className='blue-radio '
                                            type="radio"
                                            value="In Stock"
                                            checked={stockOption === 'In Stock'}
                                            onChange={handleOptionChange}
                                        />
                                        In Stock
                                    </label>
                                    <label type="radio" className={stockOption !== 'Out of Stock' ? 'radio-button grey' : 'radio-button'}>
                                        <input className='blue-radio '
                                            type="radio"
                                            value="Out of Stock"
                                            checked={stockOption === 'Out of Stock'}
                                            onChange={handleOptionChange}
                                        />
                                        Out of Stock
                                    </label>
                                </div>
                                <div className='editInventory__itemDetails__items--radio-quantity'>
                                    {stockOption === 'In Stock' && (
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
                                <select value={selectedWarehouse} className='editInventory__itemDetails__items--input checkbox'
                                    onChange={(e) => handleWarehouseChange(e.target.value)}>
                                    <option value="" disabled selected>Please select</option>
                                    {Array.isArray(warehouses) && warehouses.map(warehouse => (
                                        <option key={warehouse} value={warehouse} >{warehouse}</option>
                                    ))}
                                </select>
                                
                            </label>
                        </div>
                    </section>

                    <section className='modal__button editInventory--button'>
                        <button onClick={cancelEdit} className='modal__button--cancel editInventory--cancel'>Cancel</button>
                        <button onClick={addItemToInventory} className='modal__button--delete editInventory-save'>Save</button>
                    </section>
                    {errorMessage ? <p className='form_validation'>
                        All fields are required
                    </p> : " "}
                </form>
            </div>
        </section>
)};

export default AddInventoryItem;