import "./WarehouseListItem.scss";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { useState } from "react";
import DeleteWarehouse from '../../components/DeleteWarehouse/DeleteWarehouse'
function WarehouseListItem({ warehouse, handleDeleteWarehouse }) {
  const {
    address,
    city,
    country,
    contact_name: contactName,
    contact_phone: contactPhone,
    contact_email: contactEmail,
    warehouse_name: warehouseName,
  } = warehouse;

  const [delWarehouse, setDelWarehouse] = useState(false);

  const deleteWarehouse = () => {
    setDelWarehouse(true);
  }

  return (
    <>

      <li>
        <section className="warehouse-list-item">
          <div className="warehouse-item warehouse-item__contact--link">
            <h4 className="warehouse-item-title__mobile">WAREHOUSE</h4>
            <div className="warehouse-item__link">
              <Link to={`/warehouses/${warehouse.id}`}>
                <h3>{warehouseName}</h3>
              </Link>
              <ChevronIcon />
            </div>
          </div>
          <div className="warehouse-item warehouse-item__desktop">
            <h4 className="warehouse-item-title__mobile">ADDRESS</h4>
            <p2>{`${address}, ${city}, ${country}`}</p2>
          </div>
          <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
            <h4 className="warehouse-item-title__mobile">CONTACT NAME</h4>
            <p2>{contactName}</p2>
          </div>
          <div className="warehouse-item warehouse-item__mobile">
            <h4 className="warehouse-item-title__mobile">ADDRESS</h4>
            <p2>{`${address}, ${city}, ${country}`}</p2>
          </div>
          <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
            <h4 className="warehouse-item-title__mobile">CONTACT INFORMATION</h4>
            <p2>
              {contactPhone}
              <br />
              {contactEmail}
            </p2>
          </div>

          <div className="warehouse-item__buttons">
            <DeleteIcon className="warehouse-item__button" onClick={deleteWarehouse} />
            <EditIcon className="warehouse-item__button" />
          </div>
        </section>
      </li>
      {delWarehouse &&
        <DeleteWarehouse warehouseId={warehouse.id} warehouseName={warehouse.warehouse_name} handleDeleteWarehouse={handleDeleteWarehouse} />
      }

    </>
  );
}
export default WarehouseListItem;
