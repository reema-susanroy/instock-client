import InventoryListItem from "../InventoryListItem/InventoryListItem";
import "./InventoryList.scss";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-24px.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort-24px.svg";
// import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { Link } from "react-router-dom";

function InventoryList({ inventories, handleDeleteInventory }) {
  return (
    <section className="inventory-list-body">
      <section className="warehouse-list-header">
        <h1 className="warehouse-list-title">Inventories</h1>
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
        <Link to={"/inventories/add"}>
          <button className="warehouse-list-header__add-button">
            + Add New Item
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
          <div className="warehouse-list__title warehouse-list__title-contact-information">
            <h4>WAREHOUSE</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title warehouse-list__title-actions">
            <h4>ACTIONS</h4>
          </div>
        </section>
        <ul className="warehouse-list">
          {inventories.map((inventories) => (
            <InventoryListItem key={inventories.id} inventories={inventories} handleDeleteInventory={handleDeleteInventory} />
          ))}
        </ul>
      </section>
    </section>
  );
}

export default InventoryList;
