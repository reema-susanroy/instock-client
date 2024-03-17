import "./WarehouseInventoryItem.scss";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron_right-24px.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_outline-24px.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-24px.svg";
import { useState } from "react";
// import EditInventory from "../EditInventory/EditInventory";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-24px.svg"


function InventoryItem({ inventory, warehouseName, warehouseId, handleDeleteWarehouse}) {
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

    const [delWarehouse, setDelWarehouse] = useState(false);

    const deleteWarehouse = () => {
      setDelWarehouse(true);
    }
  
    const updateWarehouse = () => {
      handleDeleteWarehouse(inventory.id);
    }
    const cancelDelete = () => {
      setDelWarehouse(false);
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
                    <DeleteIcon className="warehouse-item__button" onClick={deleteWarehouse}/>
                    <EditIcon className="warehouse-item__button" onClick={handleEditInventory}/>
                </div>
            </section>
        </li>
        {delWarehouse &&
        <div className="modal-overlay">
          <div className="delete-modal">
          <CloseIcon onClick={cancelDelete} className="close-icon"/>
            <section className='delete-modal__title-cont'>
              <h2 className='delete-modal__title--title'>Delete {inventory.item_name} inventory item?</h2>
              <p className='delete-modal__title'>Please confirm that you'd like to delete {inventory.item_name} from the inventory list. You won't be able to undo this action.</p>
            </section>
            <section className='delete-modal__button'>
              <button onClick={cancelDelete} className='modal__button--cancel'>Cancel</button>
              <button onClick={updateWarehouse} className='modal__button--delete delColor'>Delete</button>
            </section>
          </div>
        </div>
      }
    </>
    )
}

export default InventoryItem;