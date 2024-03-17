import "./AddWarehousePage.scss";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import FormErrorMessageEmail from "../../components/FormErrorMessageEmail/FormErrorMessageEmail";
import FormErrorMessagePhone from "../../components/FormErrorMessagePhone/FormErrorMessagePhone";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow_back-24px.svg";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";

function AddWarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [warehouseNameError, setWarehouseNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [contactNameError, setContactNameError] = useState("");
  const [contactPositionError, setContactPositionError] = useState("");
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

  const formValidator = (formData) => {
    // Reset error states
    setEmailError("");
    setPhoneError("");
    setWarehouseNameError("");
    setAddressError("");
    setCityError("");
    setContactNameError("");
    setContactPositionError("");
    setCountryError("");

    let isValid = true;

    // Check if fields are empty
    if (!formData.get("warehouse-name")) {
      setWarehouseNameError("Warehouse Name field required");
      isValid = false;
    }
    if (!formData.get("street-address")) {
      setAddressError("Address field required");
      isValid = false;
    }
    if (!formData.get("city")) {
      setCityError("City field required");
      isValid = false;
    }
    if (!formData.get("contact-name")) {
      setContactNameError("Contact Name field required");
      isValid = false;
    }
    if (!formData.get("position")) {
      setContactPositionError("Contact position field required");
      isValid = false;
    }
    if (!formData.get("country")) {
      setCountryError("country field required");
      isValid = false;
    }

    // Validate email using the validator library
    if (!validator.isEmail(formData.get("email"))) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    // Validate phone number using regular expression
    const phoneRegex = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.get("phone-number"))) {
      setPhoneError("Invalid phone number format");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    // Validate the form data
    const isValid = formValidator(formData);

    if (!isValid) {
      // Form validation failed, do not proceed with submission
      console.log("Form validation failed!");
      return;
    }

    // Proceed with form submission
    setIsLoading(true);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // Add warehouse
    await addWarehouse(event);
    event.target.reset();
    setTimeout(() => {
      navigate("/warehouses");
    }, 1000);
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
    // Clear error for the active field
    switch (field) {
      case "warehouse-name":
        setWarehouseNameError("");
        break;
      case "street-address":
        setAddressError("");
        break;
      case "city":
        setCityError("");
        break;
      case "country":
        setCountryError("");
        break;
      case "contact-name":
        setContactNameError("");
        break;
      case "position":
        setContactPositionError("");
        break;
      case "phone-number":
        setPhoneError("");
        break;
      case "email":
        setEmailError("");
        break;
      default:
        break;
    }
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
          <Link to={"/warehouses"}>
            <ArrowIcon />
          </Link>
          <h1 className="new-warehouse-header__title">Add New Warehouse</h1>
        </section>
        <form
          className="new-warehouse-form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <section className="form-inputs">
            <section className="new-warehouse-details">
              <h2 className="new-warehouse-details__title">
                Warehouse Details
              </h2>
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
                } ${warehouseNameError ? 'error' : ''}`}
                placeholder="Warehouse Name"
                // When this input is focused on, handleFocus function is called with argument
                // 'warehouse-name' (field name) and updates state to show that this field is now active
                onFocus={() => handleFocus("warehouse-name")}
                onBlur={handleBlur}
              ></input>
              {warehouseNameError && (
                <FormErrorMessage message={warehouseNameError} />
              )}
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
                } ${addressError ? 'error' : ''}`}
                placeholder="Street Address"
                onFocus={() => handleFocus("street-address")}
                onBlur={handleBlur}
              ></input>
              {addressError && <FormErrorMessage message={addressError} />}
              <label htmlFor="city" className="new-warehouse-details__label">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className={`new-warehouse-details__input ${
                  activeField === "city" ? "active" : ""
                } ${cityError ? 'error' : ''}`}
                placeholder="City"
                onFocus={() => handleFocus("city")}
                onBlur={handleBlur}
              ></input>
              {cityError && <FormErrorMessage message={cityError} />}
              <label htmlFor="country" className="new-warehouse-details__label">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className={`new-warehouse-details__input ${
                  activeField === "country" ? "active" : ""
                } ${countryError ? 'error' : ''}`}
                placeholder="Country"
                onFocus={() => handleFocus("country")}
                onBlur={handleBlur}
              ></input>
              {countryError && <FormErrorMessage message={countryError} />}
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
                } ${contactNameError ? 'error' : ''}`}
                placeholder="Contact Name"
                onFocus={() => handleFocus("contact-name")}
                onBlur={handleBlur}
              ></input>
              {contactNameError && (
                <FormErrorMessage message={contactNameError} />
              )}
              <label
                htmlFor="Position"
                className="new-warehouse-details__label"
              >
                Position
              </label>
              <input
                type="text"
                name="position"
                id="position"
                className={`new-warehouse-details__input ${
                  activeField === "position" ? "active" : ""
                } ${contactPositionError ? 'error' : ''}`}
                placeholder="Position"
                onFocus={() => handleFocus("position")}
                onBlur={handleBlur}
              ></input>
              {contactPositionError && (
                <FormErrorMessage message={contactPositionError} />
              )}
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
                } ${phoneError ? 'error' : ''}`}
                placeholder="Phone Number"
                onFocus={() => handleFocus("phone-number")}
                onBlur={handleBlur}
              />
              {phoneError && <FormErrorMessagePhone message={phoneError} />}
              <label htmlFor="email" className="new-warehouse-details__label">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className={`new-warehouse-details__input ${
                  activeField === "email" ? "active" : ""
                } ${emailError ? 'error' : ''}`}
                placeholder="Email"
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
              ></input>
              {emailError && <FormErrorMessageEmail message={emailError} />}
            </section>
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
