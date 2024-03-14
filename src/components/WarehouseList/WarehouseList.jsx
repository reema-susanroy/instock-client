import "./WarehouseList.scss";
import WarehouseListItem from "../WarehouseListItem/WarehouseListItem";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-24px.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort-24px.svg";

function WarehouseList({ warehouses , handleDeleteWarehouse}) {
  return (
    <section className="warehouse-list-body">
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
        <button className="warehouse-list-header__add-button">
          + Add New Warehouse
        </button>
      </section>
      <section className="warehouse-list">
        <section className="warehouse-list-titles__desktop">
          <div className="warehouse-list__title">
            <h4>WAREHOUSE</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title">
            <h4>ADDRESS</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title">
            <h4>CONTACT NAME</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title warehouse-list__title-contact-information">
            <h4>CONTACT INFORMATION</h4>
            <SortIcon className="warehouse-list__sort-icon" />
          </div>
          <div className="warehouse-list__title warehouse-list__title-actions">
            <h4>ACTIONS</h4>
          </div>
        </section>
        <ul className="warehouse-list">
          {warehouses.map((warehouse) => (
            <WarehouseListItem key={warehouse.id} warehouse={warehouse} handleDeleteWarehouse={handleDeleteWarehouse}/>
          ))}
        </ul>
      </section>
    </section>
  );
}
export default WarehouseList;
