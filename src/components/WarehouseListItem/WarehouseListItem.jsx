import "./WarehouseListItem.scss";
import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon} from "../../assets/icons/delete_outline-24px.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg"

function WarehouseListItem({ warehouse }) {
  const { address, city, country, contact_name: contactName, contact_phone: contactPhone, } = warehouse;
  return (
    <li>
      <section>
        <div>
          <h4>WAREHOUSE</h4>
          <Link
            to={`/warehouses/${warehouse.id}`}
            className="warehouse-list-item"
          ></Link>
        </div>
        <div>
          <h4>CONTACT NAME</h4>
          <p3>{contactName}</p3>
        </div>
        <div>
          <h4>ADDRESS</h4>
          <p3>{address}{city}{country}</p3>
        </div>
        <div>
          <h4>CONTACT INFORMATION</h4>
          <p3>{contactPhone}{contactEmail}</p3>
        </div>
        <DeleteIcon />
        <EditIcon />
      </section>
    </li>
  );
}
export default WarehouseListItem;
