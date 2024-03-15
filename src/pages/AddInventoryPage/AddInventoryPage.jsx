import './AddInventoryPage.scss';
import { ReactComponent as backIcon } from "../../assets/icons/arrow_back-24px.svg";
// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import validator from "validator";

function AddInventoryPage() {

    return (
        <section className='container'>

            <div className='addInventory'>
                <div className='addInventory__header'>
                    {/* <Link to={/api/inventories}>
                        <img className='addInventory__back-arrow' src={backIcon} alt="back-arrow" />
                    </Link> */}
                    <h1>Add New Inventory Item</h1>
                </div>
                {/* <form onSubmit={handleSubmit}> */}
                <form >
                    <section className='addInventory__form'>
                        <div className='addInventory__itemDetails'>
                            <h2 className='add-warehouse__form-group-one-subtitle'>Item Details</h2>
                            
                            <section className='addInventory__itemDetails__items'>
                                <label className='addInventory__itemDetails__items--label'>Item Name
                                    <input className='addInventory__itemDetails__items--input' type="text" value="" />
                                </label>

                                <label htmlFor="description" className='addInventory__itemDetails__items--label'>Description
                                    <textarea className='addInventory__itemDetails__items--input' type="text" rows={4} placeholder="Please enter a brief description..." />
                                </label>

                                <label htmlFor="category" className='addInventory__itemDetails__items--label'>Category
                                    <select placeholder='Please select'>
                                        <option value="accessories">Accessories</option>
                                        <option value="apparel">Apparel</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="gear">Gear</option>
                                        <option value="health">Health</option>
                                    </select>
                                </label>
                            </section>
                        </div>

                        <div className='addInventory__itemAvailability'>
                            <div className='warehouse_details__header-add'>
                                <h2 htmlFor="item availability" className='add-warehouse__form-group-one-subtitle'>Item Availability</h2>
                            </div>
                            <label className='addInventory__itemDetails__items--label'>Status

                                <div className='addInventory__itemDetails__items--radio'>
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
                                <div className='addInventory__itemDetails__items--radio-quantity'>
                                    {selectedOption === 'In Stock' && (
                                        <div>
                                            <label className='addInventory__itemDetails__items--radio-quantity-label'> Quantity
                                                <input
                                                    type="number"
                                                    className='addInventory__itemDetails__items--input'
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </label>

                            <label className='addInventory__itemDetails__items--label'>Warehouse
                                <select placeholder='Please select' value={selectedWarehouse} className="addInventory__itemDetails__items--input checkbox"
                                    onChange={(e) => handleWarehouseChange(e.target.value)}>
                                    {Array.isArray(warehouses) && warehouses.map(warehouse => (
                                        <option key={warehouse} value={warehouse} >{warehouse}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </section>

                    <section className='modal__button addInventory--button'>
                        <button onClick={canceladd} className='modal__button--cancel addInventory--cancel'>Cancel</button>
                        <button onClick={updateWarehouse} className='modal__button--delete addInventory-save'>Save</button>
                    </section>
                    {errorMesage ? <p className='form_validation'>
                        All fields are required
                    </p> : " "}
                </form>
            </div>
        </section>
)};

export default AddInventoryPage;

