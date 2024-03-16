import "./InventoryListItem.scss";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { useState } from "react";

function InventoryListItem({ inventories, handleDeleteInventory }) {
  const {
    item_name,
    category,
    status,
    quantity,
    warehouse_name
} = inventories;
const navigate = useNavigate();
const warehouseId= inventories.warehouse_id;

const [delInventory, setDelInventory] = useState(false);

const deleteInventory = () => {
    setDelInventory(true);
}

const updateInventory = () => {
    handleDeleteInventory(inventories.id);
}
const cancelDelete = () => {
    setDelInventory(false);
}
const inventory = inventories;
const warehouseName = warehouse_name
// const warehouseId = warehouseId
const thisPath= "inventory";
const editInventory=()=>{
    console.log(inventory,warehouseId,warehouseName)
    navigate(`/inventories/${inventories.id}/edit`,{ state: { inventory, warehouseName , warehouseId, thisPath} });

}

return (
    <>
        <li>
            <section className="warehouse-list-item">
                <div className="warehouse-item warehouse-item__contact--link">
                    <h4 className="warehouse-item-title__mobile">INVENTORY ITEM</h4>
                    <div className="warehouse-item__link">
                        <Link to={`/inventory/${item_name}`}>
                        <h3 className="inventory-list__item-name">{item_name}</h3>
                        </Link>
                        <ChevronIcon />
                    </div>  
                </div>
                <div className="warehouse-item warehouse-item__desktop">
                    <h4 className="warehouse-item-title__mobile">CATEGORY</h4>
                    <p className="inventory-list__item-content">{category}</p>
                </div>
                <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
                    <h4 className="warehouse-item-title__mobile">STATUS</h4>
                    <p className={ status === "In Stock" ? "inStock" : "outStock"}>{status}</p>
                </div>
                <div className="warehouse-item warehouse-item__mobile">
                    <h4 className="warehouse-item-title__mobile">CATEGORY</h4>
                    <p className="inventory-list__item-content">{category}</p>
                </div>
                <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide">
                    <h4 className="warehouse-item-title__mobile">QUANTITY</h4>
                    <p className="inventory-list__item-content">{quantity}</p>
                </div>
                <div className="warehouse-item warehouse-item__contact warehouse-item__contact--wide inventory-warehouse-name">
                    <h4 className="warehouse-item-title__mobile">WAREHOUSE</h4>
                    <p className="inventory-list__item-content">{warehouse_name}</p>
                </div>
                <div className="warehouse-item__buttons">
                    <DeleteIcon className="warehouse-item__button" onClick={deleteInventory}/>
                    <EditIcon className="warehouse-item__button" onClick={editInventory}/>
                </div>
            </section>
        </li>

        {delInventory &&
            <div className="modal-overlay">
            <div className="modal">
                <section className='modal__title-cont'>
                    <h2 className='modal__title--title'>Delete {item_name} inventory item ?</h2>
                    <p className='modal__title'>Please confirm that you'd like to delete the {item_name} from the list of inventory list. You won't be able to undo this action.</p>
                </section>
                <section className='modal__button'>
                    <button onClick={cancelDelete} className='modal__button--cancel'>Cancel</button>
                    <button onClick={updateInventory} className='modal__button--delete delColor'>Delete</button>
                </section>
            </div>
            </div>
        }

    </>

)
}
export default InventoryListItem;
