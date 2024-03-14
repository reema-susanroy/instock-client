import "./WarehouseInventoryItem.scss";
import { Link } from "react-router-dom";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";

function InventoryItem({ inventory }) {
    const {
        item_name,
        category,
        status,
        quantity
    } = inventory;

    return (
        <li>
            <section className="inventory-item__wrapper">
                <div className="inventory-item__item">
                    <h4 className="inventory-item__title">INVENTORY ITEM</h4>
                    <Link to={`/inventory/${item_name}`} className="inventory-item-name">
                    {item_name}
                    </Link>
                    <ChevronIcon />
                </div>
                <div>
                    <h4 className="inventory-item__title">CATEGORY</h4>
                    <p>{category}</p>
                </div>
                <div>
                    <h4 className="inventory-item__title">STATUS</h4>
                    <p>{status}</p>
                </div>
                <div>
                    <h4 className="inventory-item__title">QUANTITY</h4>
                    <p>{quantity}</p>
                </div>
                <div>
                    <h4 className="inventory-item__title">ACTIONS</h4>
                </div>
                <DeleteIcon />
                <EditIcon />
            </section>
        </li>

    )
}

export default InventoryItem;