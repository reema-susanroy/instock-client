import InventoryItem from "../WarehouseInventoryItem/WarehouseInventoryItem";
import "./InventoryList.scss";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-24px.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { Link } from "react-router-dom";

function InventoryList({ inventories }) {
  return (
    <section>
      <section className="warehouse-list-header">
        <h1 className="warehouse-list-title">Warehouses</h1>
        <div className="warehouse-list-header__search-bar-container">
          <input
            className="warehouse-list-header__search-bar"
            id="search"
            name="search"
            type="text"
            placeholder="Search..."
          ></input>
          <SearchIcon className="warehouse-list-header__search-bar-icon" />
        </div>
        <Link to={"/warehouses/add"}>
          <button className="warehouse-list-header__add-button">
            + Add New Warehouse
          </button>
        </Link>
      </section>
      <section className="warehouse-list">
        <section className="warehouse-list-titles__desktop">
          <div className="warehouse-list__title">
            <h4>INVENTORY ITEM</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title">
            <h4>CATEGORY</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title">
            <h4>STATUS</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title warehouse-list__title-contact-information">
            <h4>QUANTITY</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title warehouse-list__title-actions">
            <h4>ACTIONS</h4>
          </div>
        </section>
        {/* <ul className="warehouse-list">
          {inventories.map((inventory) => (
            <InventoryItem key={inventory.id} inventory={inventory} />
          ))}
        </ul> */}
      </section>
    </section>
  );
}

export default InventoryList;
