import backIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./EditInventory.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

function EditInventory({ inventory, warehouseName, warehouseId, flag }) {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState(inventory.item_name);
  const [description, setDescription] = useState(inventory.description);
  const [quantity, setQuantity] = useState(inventory.quantity);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(inventory.category);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouseName);
  const [selectedOption, setSelectedOption] = useState(inventory.status);
  const [errorMessage, setErrorMessage] = useState(false);
  const [clickedSave, setClickedSave] = useState(false);

  let url;
  if (flag === "inventory") {
    url = `/inventories`;
  } else if (flag === "inventory-details") {
    url = `/inventories/${inventory.id}`;
  } else {
    url = `/warehouses/${warehouseId}`;
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Out of Stock") {
      setQuantity(0);
    }
    if (event.target.value === "In Stock") {
      setQuantity(inventory.quantity);
    }
  };
  const handleItemNameChange = (value) => {
    setItemName(value);
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const handleCategoriesChange = (value) => {
    setSelectedCategory(value);
  };

  const handleWarehouseChange = (value) => {
    setSelectedWarehouse(value);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const responseCategories = await axios.get(
          "http://localhost:5000/api/inventories/inventories/categories"
        );
        setCategories(responseCategories.data);
        const responseWarehouses = await axios.get(
          "http://localhost:5000/api/inventories/inventories/warehouses"
        );
        setWarehouses(responseWarehouses.data);
      } catch (error) {
        console.error("Error fetching inventory details from server:", error);
      }
    }
    fetchCategories();
  }, []);

  const validateInput = () => {
    if (!warehouseId || !itemName || !description) {
      return false;
    } else return true;
  };
  const validateQuantities = () => {
    if (selectedOption === "In Stock") {
      if (!quantity) {
        return false;
      }
    }
    return true;
  };

  const updateWarehouse = async (e) => {
    e.preventDefault();
    const Validation = validateInput();
    const validateQuantity = validateQuantities();
    setClickedSave(true);

    if (Validation && validateQuantity) {
      try {
        if (selectedWarehouse !== warehouseName) {
          try {
            const warehouse = await axios.get(
              `http://localhost:5000/api/warehouses/name/${selectedWarehouse}`
            );
            warehouseId = warehouse.data.id;
            if (!Number.isInteger(parseInt(warehouseId, 10))) {
              throw new Error("Invalid warehouse ID");
            }
          } catch (error) {
            console.log("Unable to fetch warehouse name from DB: " + error);
          }
        }

        await axios.put(
          `http://localhost:5000/api/inventories/${inventory.id}`,
          {
            warehouse_id: warehouseId,
            item_name: itemName,
            description: description,
            category: selectedCategory,
            status: selectedOption,
            quantity: String(quantity),
          }
        );
        navigate(url);
      } catch (message) {
        console.log("Unable to do Update inventory item : " + message);
      }
    } else {
      setErrorMessage(true);
    }
  };

  const cancelEdit = (event) => {
    event.preventDefault();
    navigate(url);
  };

  return (
    <>
      <section className="container">
        <div className="editInventory">
          <div className="editInventory__header">
            <Link to={url}>
              <img
                className="editInventory__back-arrow"
                src={backIcon}
                alt="back-arrow"
              />
            </Link>
            <h1 className="edit-inventory__title">Edit Inventory Item</h1>
          </div>
          <form>
            <section className="editInventory__form">
              <div className="editInventory__itemDetails">
                <h2 className="edit-inventory__subtitle">Item Details</h2>
                <section className="editInventory__itemDetails__items">
                  <label className="editInventory__itemDetails__items--label">
                    Item Name
                    <input
                      className={`editInventory__itemDetails__items--input ${(errorMessage && !itemName) ? 'error' : ''}`}
                      type="text"
                      value={itemName}
                      onChange={(e) => {
                        handleItemNameChange(e.target.value);
                      }}
                    />
                    {clickedSave && !itemName && (
                      <div className="error">
                        <img
                          src={errorIcon}
                          className="error-icon"
                          alt="Error Icon"
                        />
                        <span className="error-text">
                          This field is required
                        </span>
                      </div>
                    )}
                  </label>

                  <label className="editInventory__itemDetails__items--label">
                    Description
                    <textarea
                      className= {`editInventory__itemDetails__items--input ${(errorMessage && !description) ? 'error' : ''}`}
                      type="text"
                      rows={4}
                      value={description}
                      onChange={(e) => {
                        handleDescriptionChange(e.target.value);
                      }}
                    />
                    {clickedSave && !description && (
                      <div className="error">
                        <img
                          src={errorIcon}
                          className="error-icon"
                          alt="Error Icon"
                        />
                        <span className="error-text">
                          This field is required
                        </span>
                      </div>
                    )}
                  </label>
                  <label className="editInventory__itemDetails__items--label">
                    Category
                    <select
                      value={selectedCategory}
                      className={`editInventory__itemDetails__items--input ${(errorMessage && !selectedCategory) ? 'error' : ''}  checkbox`}
                      onChange={(e) => {
                        handleCategoriesChange(e.target.value);
                      }}
                    >
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option
                            className="checkbox__options"
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        ))}
                    </select>
                  </label>
                </section>
              </div>

              <div className="editInventory__itemAvailability">
                <div className="warehouse_details__header-edit">
                  <h2 className="edit-inventory__subtitle">
                    Item Availability
                  </h2>
                </div>
                <label className="editInventory__itemDetails__items--label">
                  Status
                  <div className="editInventory__itemDetails__items--radio">
                    <label
                      type="radio"
                      className={
                        selectedOption !== "In Stock"
                          ? "radio-button grey"
                          : "radio-button"
                      }
                    >
                      <input
                        className="blue-radio "
                        type="radio"
                        value="In Stock"
                        checked={selectedOption === "In Stock"}
                        onChange={handleOptionChange}
                      />
                      In Stock
                    </label>
                    <label
                      type="radio"
                      className={
                        selectedOption !== "Out of Stock"
                          ? "radio-button grey"
                          : "radio-button"
                      }
                    >
                      <input
                        className="blue-radio "
                        type="radio"
                        value="Out of Stock"
                        checked={selectedOption === "Out of Stock"}
                        onChange={handleOptionChange}
                      />
                      Out of Stock
                    </label>
                  </div>
                  <div className="editInventory__itemDetails__items--radio-quantity">
                    {selectedOption === "In Stock" && (
                      <div>
                        <label className="editInventory__itemDetails__items--radio-quantity-label">
                          {" "}
                          Quantity
                          <input
                            type="number"
                            className={`editInventory__itemDetails__items--input ${(errorMessage && !quantity) ? 'error' : ''}`}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </label>
                      </div>
                    )}
                    {clickedSave &&
                      selectedOption === "In Stock" &&
                      !quantity && (
                        <div className="error">
                          <img
                            src={errorIcon}
                            className="error-icon"
                            alt="Error Icon"
                          />
                          <span className="error-text">
                            This field is required
                          </span>
                        </div>
                      )}
                  </div>
                </label>

                <label className="editInventory__itemDetails__items--label">
                  Warehouse
                  <select
                    value={selectedWarehouse}
                    className={`editInventory__itemDetails__items--input ${(errorMessage && !selectedWarehouse) ? 'error' : ''} checkbox`}
                    onChange={(e) => handleWarehouseChange(e.target.value)}
                  >
                    {Array.isArray(warehouses) &&
                      warehouses.map((warehouse) => (
                        <option key={warehouse} value={warehouse}>
                          {warehouse}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="modal__button editInventory--button">
              <button
                onClick={cancelEdit}
                className="modal__button--cancel editInventory--cancel"
              >
                Cancel
              </button>
              <button
                onClick={updateWarehouse}
                className="modal__button--delete editInventory-save"
              >
                Save
              </button>
            </section>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditInventory;