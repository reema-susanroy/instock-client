import "./WarehouseListItem.scss";
import "../InventoryListItem/InventoryListItem.scss"
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-24px.svg"
import { useState } from "react";

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

  const updateWarehouse = () => {
    handleDeleteWarehouse(warehouse.id);
  }
  const cancelDelete = () => {
    setDelWarehouse(false);
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
            <p className="warehouse-item__content">{`${address}, ${city}, ${country}`}</p>
          </div>
          <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
            <h4 className="warehouse-item-title__mobile">CONTACT NAME</h4>
            <p className="warehouse-item__content">{contactName}</p>
          </div>
          <div className="warehouse-item warehouse-item__mobile">
            <h4 className="warehouse-item-title__mobile">ADDRESS</h4>
            <p className="warehouse-item__content">{`${address}, ${city}, ${country}`}</p>
          </div>
          <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
            <h4 className="warehouse-item-title__mobile">CONTACT INFORMATION</h4>
            <p className="warehouse-item__content">
              {contactPhone}
              <br />
              {contactEmail}
            </p>
          </div>

          <div className="warehouse-item__buttons">
            <DeleteIcon className="warehouse-item__button" onClick={deleteWarehouse} />
            <Link to={`/warehouses/${warehouse.id}/edit`}>
              <EditIcon className="warehouse-item__button" />
            </Link>
          </div>
        </section>
      </li>
      {delWarehouse &&
        <div className="modal-overlay">
          <div className="delete-modal">
          <CloseIcon onClick={cancelDelete} className="close-icon"/>
            <section className='delete-modal__title-cont'>
              <h2 className='delete-modal__title--title'>Delete {warehouseName} Warehouse ?</h2>
              <p className='delete-modal__title'>Please confirm that you'd like to delete the {warehouseName} from the list of warehouses. You won't be able to undo this action.</p>
            </section>
            <section className='delete-modal__button'>
              <button onClick={cancelDelete} className='modal__button--cancel'>Cancel</button>
              <button onClick={updateWarehouse} className='modal__button--delete delColor'>Delete</button>
            </section>
          </div>
        </div>
      }

    </>
  );
}
export default WarehouseListItem;
