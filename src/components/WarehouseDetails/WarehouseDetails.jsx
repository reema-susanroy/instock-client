import "./WarehouseDetails.scss";
import edit from '../../assets/icons/edit-24px-white.svg'
import backIcon from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

function WarehouseDetails({ currentData }) {
  console.log(currentData);
  return (
    <div className="warehouse_details">
      <div className="warehouse_details__header-cont">
        <div className="warehouse_details__header">
          <Link to="/warehouses">
            <img
              className="warehouse_details__header--back-arrow"
              src={backIcon}
              alt="back-arrow"
            />
          </Link>
          <h1 className="warehouse-details__warehouse-title">{currentData.warehouse_name}</h1>
        </div>
        <div className="warehouse_details__header-edit">
        <Link to={`/warehouses/${currentData.id}/edit`} className='warehouse_details__header-edit-cont'>
            <img className='warehouse_details__header--edit' src={edit} alt="edit" /> <span className='warehouse_details__header--edit__span'>Edit</span>
          </Link>
        </div>
      </div>
      <div className="warehouse_details__content-cont">
        <div className="warehouse_details__content--address">
          <h4 className="warehouse_details__content--label">
            WAREHOUSE ADDRESS:
          </h4>
          <div className="warehouse_details__content--address-data">
            <p className="warehouse-details-content">
              {`${currentData.address}, ${currentData.city}, ${currentData.country} `}
            </p>
          </div>
        </div>
        <div className="warehouse_details__content--contact">
          <div>
            <h4 className="warehouse_details__content--label">CONTACT NAME:</h4>
            <p className="warehouse-details-content">
              {currentData.contact_name}
            </p>
            <p className="warehouse-details-content">
              {currentData.contact_position}
            </p>
          </div>
          <div>
            <h4 className="warehouse_details__content--label">
              CONTACT INFORMATION:
            </h4>
            <p className="warehouse-details-content">
              {currentData.contact_phone}
            </p>
            <p className="warehouse-details-content">
              {currentData.contact_email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDetails;
