
import backIcon from '../../assets/icons/arrow_back-24px.svg'
import edit from '../../assets/icons/edit-24px.svg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './EditInventory.scss'

function EditInventory({ inventory }) {
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const responseCategories = await axios.get('http://localhost:5000/api/inventories/inventories/categories');
                setCategories(responseCategories.data);
                const responseWarehouses = await axios.get('http://localhost:5000/api/inventories/inventories/warehouses');
                setWarehouses(responseWarehouses.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);


    return (
        <>
            <div className=''>
                <div className='editInventory__header'>
                    <Link to='/warehouses' >
                        <img className='warehouse_details__header--back-arrow' src={backIcon} alt="back-arrow" />
                    </Link>
                    <h1>Edit Inventory Item</h1>
                </div>


                <form>
                    <div className='warehouse_details__header-edit'>
                        <h2>Item Details</h2>
                    </div>

                    <label className=''>Item Name
                        <input className='' type="text" placeholder={inventory.item_name} />
                    </label>

                    <label className=''>Description
                        <input className='' type="text" placeholder={inventory.description} />
                    </label>
                    <label className=''>Category
                        <select>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>

                    <div>
                        <div className='warehouse_details__header-edit'>
                            <h2>Item Availability</h2>
                        </div>

                        <label className=''>Status
                            <label>
                                <input
                                    type="radio"
                                    value="In Stock"
                                    checked={selectedOption === 'In Stock'}
                                    onChange={handleOptionChange}
                                />
                                In Stock
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Out of Stock"
                                    checked={selectedOption === 'Out of Stock'}
                                    onChange={handleOptionChange}
                                />
                                Out of Stock
                            </label>
                        </label>

                        <label className=''>Warehouse
                            <select>
                                {warehouses.map(warehouses => (
                                    <option key={warehouses} value={warehouses}>{warehouses}</option>
                                ))}
                            </select>
                        </label>


                    </div>

                </form>
            </div>
        </>
    )
}

export default EditInventory;