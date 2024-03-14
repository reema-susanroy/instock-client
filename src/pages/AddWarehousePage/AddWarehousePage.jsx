import "./AddWarehousePage.scss";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow_back-24px.svg";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddWarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef();
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = "New Warehouse";
  }, []);

  // Fetch warehouses list from database
  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/warehouses"
        );
        setWarehouses(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    getWarehouses();
  }, []);

  // Get data from user through form
  const addWarehouse = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const warehousesData = {
      warehousName: formData.get("warehouse-name"),
      streetAddress: formData.get("street-address"),
      city: formData.get("city"),
      country: formData.get("country"),
      contactName: formData.get("contact-name"),
      position: formData.get("position"),
      phoneNumber: formData.get("phone-number"),
      email: formData.get("email"),
    };

    try {
      const warehouse = await axios.post("http://localhost:5000/api/warehouses", warehousesData);
      setWarehouses([...warehouses, warehouse.data]);
      //   setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(formRef.current);
    try {
      const warehouse = await addWarehouse(formData);
      // Handle successful submission ?? do we need something upon submit
      navigate("/warehouses");
      setIsLoading(false)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const cancelUpload = (event) => {
    event.preventDefault();
    navigate("/warehouses");
    // setSubmitSuccess(false);
  };

//  

  return (
    <section className="new-warehouse-page">
      <section className="new-warehouse-body">
        <section className="new-warehouse-header">
          <ArrowIcon />
          <h1 className="new-warehouse-header__title">Add New Warehouse</h1>
        </section>
        <form
          className="new-warehouse-form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <section className="new-warehouse-details">
            <h2 className="new-warehouse-details__title">Warehouse Details</h2>
            <label
              htmlFor="warehouse-name"
              className="new-warehouse-details__label"
            >
              Warehouse Name
            </label>
            <input
              type="text"
              name="warehouse-name"
              id="warehouse-name"
              className="new-warehouse-details__input"
              placeholder="Warehouse Name"
            ></input>
            <label
              htmlFor="street-address"
              className="new-warehouse-details__label"
            >
              Street Address
            </label>
            <input
              type="text"
              name="street-address"
              id="street-address"
              className="new-warehouse-details__input"
              placeholder="Street Address"
            ></input>
            <label htmlFor="city" className="new-warehouse-details__label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="new-warehouse-details__input"
              placeholder="City"
            ></input>
            <label htmlFor="country" className="new-warehouse-details__label">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="new-warehouse-details__input"
              placeholder="Country"
            ></input>
          </section>
          <section className="new-warehouse-details new-warehouse-details--bottom">
            <h2 className="new-warehouse-details__title">Contact Details</h2>
            <label
              htmlFor="contact-name"
              className="new-warehouse-details__label"
            >
              Contact Name
            </label>
            <input
              type="text"
              name="contact-name"
              id="contact-name"
              className="new-warehouse-details__input"
              placeholder="Contact Name"
            ></input>
            <label htmlFor="Position" className="new-warehouse-details__label">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              className="new-warehouse-details__input"
              placeholder="Position"
            ></input>
            <label
              htmlFor="phone-number"
              className="new-warehouse-details__label"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              className="new-warehouse-details__input"
              placeholder="Phone Number"
            ></input>
            <label htmlFor="email" className="new-warehouse-details__label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="new-warehouse-details__input"
              placeholder="Email"
            ></input>
          </section>
        </form>
        <section className="button-section">
          <button className="button-section__cancel" onClick={cancelUpload}>Cancel</button>
          <button className="button-section__add" type="submit">+ Add Warehouse</button>
        </section>
      </section>
    </section>
  );
}

export default AddWarehousePage;
