import "./AddWarehousePage.scss";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow_back-24px.svg";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";

function AddWarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
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
    console.log("addWareshouse is clicked!");
    event.preventDefault();
    console.log("addWareshouse is clicked! After prevent default!");
    const formData = formRef.current;
    console.log(formData);
    const warehousesData = {
      warehouse_name: formData["warehouse-name"].value,
      address: formData["street-address"].value,
      city: formData["city"].value,
      country: formData["country"].value,
      contact_name: formData["contact-name"].value,
      contact_position: formData["position"].value,
      contact_phone: formData["phone-number"].value,
      contact_email: formData["email"].value,
    };

    console.log(warehousesData);
    try {
      console.log("Sending warehouse data to server:", warehousesData);
      const warehouse = await axios.post(
        "http://localhost:5000/api/warehouses",
        JSON.stringify(warehousesData), // Convert to JSON,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Warehouse data sent successfully:", warehouse.data);
      setWarehouses([...warehouses, warehouse.data]);
      //   setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const formValidator = () => {
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
      setError("All fields are required");
      return;
    }

    // Validate email using the validator library
    if (!validator.isEmail(formData.contact_email)) {
      setError("Invalid email format");
      // setTimeout(() => {
      //     setError('');
      //     navigate(`/warehouses/${formData.id}/edit`);
      // }, 2000);
      return;
    }

    // Validate phone number using regular expression
    const phoneRegex = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.contact_phone)) {
      setError("Invalid phone number format");
      // setTimeout(() => {
      //     setErrorMessage('');
      //     navigate(`/warehouses/${formData.id}/edit`);
      // }, 2000);
      return;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Start of handleSubmit function!");
    if (!formValidator) {
      setError("Invalid form");
    } else {
      setIsLoading(true);
      const formData = new FormData(formRef.current);
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Proceed with form submission
      await addWarehouse(event);
      event.target.reset();
      setTimeout(() => {
        navigate("/warehouses");
      }, 1000);
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
            />
            {phoneError && <FormErrorMessage message={phoneError} />}
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
            {emailError && <FormErrorMessage message={emailError} />}
          </section>
          <section className="button-section">
            <button className="button-section__cancel" onClick={cancelUpload}>
              Cancel
            </button>
            <button
              className="button-section__add"
              // onClick={handleSubmit}
              type="submit"
            >
              + Add Warehouse
            </button>
          </section>
        </form>
      </section>
    </section>
  );
}

export default AddWarehousePage;
