import "./WarehouseListItem.scss";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";

function WarehouseListItem({ warehouse }) {
  const {
    address,
    city,
    country,
    contact_name: contactName,
    contact_phone: contactPhone,
    contact_email: contactEmail,
    warehouse_name: warehouseName,
  } = warehouse;
  return (
    <li>
      <section className="warehouse-list-item">
        <div>
          <h4>WAREHOUSE</h4>
          <div>
            <Link
              to={`/warehouses/${warehouse.id}`}
            >
              {warehouseName}
            </Link>
            <ChevronIcon />
          </div>
        </div>
        <div>
          <h4>CONTACT NAME</h4>
          <p>{contactName}</p>
        </div>
        <div>
          <h4>ADDRESS</h4>
          <p>{`${address}, ${city}, ${country}`}</p>
        </div>
        <div>
          <h4>CONTACT INFORMATION</h4>
          <p>
            {contactPhone}
            <br />
            {contactEmail}
          </p>
        </div>
        <DeleteIcon />
        <EditIcon />
      </section>
    </li>
  );
}
export default WarehouseListItem;
