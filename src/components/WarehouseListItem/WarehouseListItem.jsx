import "./WarehouseListItem.scss";
import { Link } from "react-router-dom";

function WarehouseListItem({ warehouse }) {
  const { title, image, channel } = video;
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
        </div>
        <div>
          <h4>ADDRESS</h4>
        </div>
        <div>
          <h4>ADDRESS</h4>
        </div>
      </section>
    </li>
  );
}
export default VideoListItem;
