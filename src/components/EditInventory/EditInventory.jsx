
import backIcon from '../../assets/icons/arrow_back-24px.svg'
import edit from '../../assets/icons/edit-24px.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './EditInventory.scss'

function EditInventory({ inventory, warehouseName }) {
    const navigate=useNavigate();
    const [itemName, setItemName] = useState(inventory.item_name);
    const [description, setDescription] = useState(inventory.description);
    // const [itemName, setItemName] = useState(inventory.item_name);


    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState('');

    const [quantity, setQuantity] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);



    // const [stock, setStock] = useState(inventory.item_name);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleItemNameChange = (value) => {
        setItemName(value);
    };
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };
    const handleCategoriesChange = (value) => {
        setSelectedCategory(value);
    }

    const handleWarehouseChange = (value) => {
        setSelectedWarehouse(value);
    }
    useEffect(() => {
        async function fetchCategories() {
            try {
                const responseCategories = await axios.get('http://localhost:5000/api/inventories/inventories/categories');
                setCategories(responseCategories.data);
                const responseWarehouses = await axios.get('http://localhost:5000/api/inventories/inventories/warehouses');
                setWarehouses(responseWarehouses.data);
                const responseQuantity = await axios.get(`http://localhost:5000/api/inventories/${inventory.id}/quantity`)
                setQuantity(responseQuantity.data[0].quantity);
            } catch (error) {
                console.error('Error fetching inventory details from server:', error);
            }
        }
        fetchCategories();
    }, []);

    const updateWarehouse = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/inventories/${inventory.id}`, {
                warehouse_id: inventory.id,
                item_name: inventory.item_name,
                description: inventory.description,
                category: inventory.category,
                status: selectedOption,
                quantity: quantity
            });
            setUpdateSuccess(true);
        }
        catch (message) {
            console.log('Unable to do Update inventory item : ' + message);
        }
    }

    const cancelEdit =() =>{
        navigate(`/inventories/${inventory.id}`)
    }
    return (
        <>
            <div className=''>
                <div className='editInventory__header'>
                    <Link to='/warehouses' >
                        <img className='editInventory__back-arrow' src={backIcon} alt="back-arrow" />
                    </Link>
                    <h1>Edit Inventory Item</h1>
                </div>

                {/* <form onSubmit={handleSubmit}> */}
                    <form>
                    <div className='editInventory__itemDetails'>
                        <h2>Item Details</h2>
                        <section className='editInventory__itemDetails__items'>
                            <h3 className='editInventory__itemDetails__items--h3'>Item Name
                                <input className='editInventory__itemDetails__items--input' type="text" value={itemName}
                                    onChange={(e) => handleItemNameChange(e.target.value)} />
                            </h3>

                            <h3 className='editInventory__itemDetails__items--h3'>Description
                                <textarea className='editInventory__itemDetails__items--input' type="text" rows={4} value={description}
                                    onChange={(e) => handleDescriptionChange(e.target.value)} />
                            </h3>
                            <h3 className='editInventory__itemDetails__items--h3'>Category
                                <select value={selectedCategory} className='editInventory__itemDetails__items--input checkbox'
                                    onChange={(e) => handleCategoriesChange(e.target.value)}>
                                    {Array.isArray(categories) && categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>



                            </h3>
                        </section>
                    </div>

                    <div className='editInventory__itemAvailability'>
                        <div className='warehouse_details__header-edit'>
                            <h2>Item Availability</h2>
                        </div>

                        <h3 className='editInventory__itemDetails__items--h3'>Status

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
                                        <h3 className='editInventory__itemDetails__items--radio-quantity-h3'> Quantity
                                            <input
                                                type="number"
                                                className='editInventory__itemDetails__items--input'
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </h3>

                        <h3 className='editInventory__itemDetails__items--h3'>Warehouse
                            <select value={selectedWarehouse} className='editInventory__itemDetails__items--input checkbox '
                                onChange={(e) => handleWarehouseChange(e.target.value)}>
                                {Array.isArray(warehouses) && warehouses.map(warehouse => (
                                    <option key={warehouse} value={warehouse} >{warehouse}</option>
                                ))}
                            </select>
                        </h3>


                    </div>

                    <section className='modal__button editInventory--button'>
                        <button onClick={cancelEdit} className='modal__button--cancel editInventory--cancel'>Cancel</button>
                        <button onClick={updateWarehouse} className='modal__button--delete editInventory-save'>Save</button>
                        {/* onClick={() => updateWarehouse(inventory.id)} */}
                    </section>

                </form>
            </div>
        </>
    )
}

export default EditInventory;