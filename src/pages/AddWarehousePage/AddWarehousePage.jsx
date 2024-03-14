import "./AddWarehousePage.scss";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow_back-24px.svg";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddWarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeField, setActiveField] = useState(null);
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
      warehouse_name: formData.get("warehouse-name"),
      address: formData.get("street-address"),
      city: formData.get("city"),
      country: formData.get("country"),
      contact_name: formData.get("contact-name"),
      contact_position: formData.get("position"),
      contact_phone: formData.get("phone-number"),
      contact_email: formData.get("email"),
    };

    try {
      const warehouse = await axios.post(
        "http://localhost:5000/api/warehouses",
        JSON.stringify(warehousesData), // Convert to JSON,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      setIsLoading(false);
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

  // called when a field is receives focus, takes parameter 'field' which connects to the field name.
  // Then it sets the activeField state to the value of the field parameter
  const handleFocus = (field) => {
    setActiveField(field);
  };

  // resets the active field to null when a user clicks away from it and is no
  // longer focused on it.
  const handleBlur = () => {
    setActiveField(null);
  };

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
              className={`new-warehouse-details__input ${
                activeField === "warehouse-name" ? "active" : ""
              }`}
              placeholder="Warehouse Name"
              // When this input is focused on, handleFocus function is called with argument 
              // 'warehouse-name' (field name) and updates state to show that this field is now active
              onFocus={() => handleFocus("warehouse-name")}
              onBlur={handleBlur}
            ></input>
            <FormErrorMessage />
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
              className={`new-warehouse-details__input ${
                activeField === "street-address" ? "active" : ""
              }`}
              placeholder="Street Address"
              onFocus={() => handleFocus("street-address")}
              onBlur={handleBlur}
            ></input>
            <label htmlFor="city" className="new-warehouse-details__label">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className={`new-warehouse-details__input ${
                activeField === "city" ? "active" : ""
              }`}
              placeholder="City"
              onFocus={() => handleFocus("city")}
              onBlur={handleBlur}
            ></input>
            <label htmlFor="country" className="new-warehouse-details__label">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className={`new-warehouse-details__input ${
                activeField === "country" ? "active" : ""
              }`}
              placeholder="Country"
              onFocus={() => handleFocus("country")}
              onBlur={handleBlur}
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
              className={`new-warehouse-details__input ${
                activeField === "contact-name" ? "active" : ""
              }`}
              placeholder="Contact Name"
              onFocus={() => handleFocus("contact-name")}
              onBlur={handleBlur}
            ></input>
            <label htmlFor="Position" className="new-warehouse-details__label">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              className={`new-warehouse-details__input ${
                activeField === "position" ? "active" : ""
              }`}
              placeholder="Position"
              onFocus={() => handleFocus("position")}
              onBlur={handleBlur}
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
              className={`new-warehouse-details__input ${
                activeField === "phone-number" ? "active" : ""
              }`}
              placeholder="Phone Number"
              onFocus={() => handleFocus("phone-number")}
              onBlur={handleBlur}
            ></input>
            <label htmlFor="email" className="new-warehouse-details__label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={`new-warehouse-details__input ${
                activeField === "email" ? "active" : ""
              }`}
              placeholder="Email"
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            ></input>
          </section>
        </form>
        <section className="button-section">
          <button className="button-section__cancel" onClick={cancelUpload}>
            Cancel
          </button>
          <button
            className="button-section__add"
            onClick={addWarehouse}
            type="submit"
          >
            + Add Warehouse
          </button>
        </section>
      </section>
    </section>
  );
}

export default AddWarehousePage;
