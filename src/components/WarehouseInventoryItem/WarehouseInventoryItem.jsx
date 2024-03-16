import "./WarehouseInventoryItem.scss";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { useState } from "react";
import EditInventory from "../EditInventory/EditInventory";

function InventoryItem({ inventory, warehouseName, warehouseId}) {
    const {
        id,
        item_name,
        category,
        status,
        quantity
    } = inventory;
    const navigate = useNavigate();
    // const [editInventory, setEditInventory] =useState(false);
    // const [inventoryItem, setInventoryItem] = useState(inventory);
    let flag;
    flag="warehouses"
    const handleEditInventory =() =>{
        navigate(`/inventories/${inventory.id}/edit`,{ state: { inventory, warehouseName, warehouseId , flag} });

    }
    return (
        <>
        <li>
            <section className="warehouse-list-item">
                <div className="warehouse-item warehouse-item__contact--link">
                    <h4 className="warehouse-item-title__mobile">INVENTORY ITEM</h4>
                    <div className="warehouse-item__link">
                        <Link to={`/inventories/${id}`}>
                        <h3>{item_name}</h3>
                        </Link>
                        <ChevronIcon />
                    </div>  
                </div>
                <div className="warehouse-item warehouse-item__desktop">
                    <h4 className="warehouse-item-title__mobile">CATEGORY</h4>
                    <p className="inventory-item__content">{category}</p>
                </div>
                <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
                    <h4 className="warehouse-item-title__mobile">STATUS</h4>
                    <p2 className={ status === "In Stock" ? "inStock" : "outStock"}>{status}</p2>
                </div>
                <div className="warehouse-item warehouse-item__mobile">
                    <h4 className="warehouse-item-title__mobile">CATEGORY</h4>
                    <p className="inventory-item__content">{category}</p>
                </div>
                <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
                    <h4 className="warehouse-item-title__mobile">QUANTITY</h4>
                    <p className="inventory-item__content">{quantity}</p>
                </div>
               
                <div className="warehouse-item__buttons">
                    <DeleteIcon className="warehouse-item__button"/>
                    <EditIcon className="warehouse-item__button" onClick={handleEditInventory}/>
                </div>
            </section>
        </li>
        {/* {editInventory &&
            <EditInventory inventory={inventory}/>
        } */}
    </>
    )
}

export default InventoryItem;