import "./InventoryDeleteModal.scss";

function InventoryDeleteModal() {
    return (
        <>
            <h1>Delete {inventory_name} inventory item?</h1>
            <p1>
                Please confirm that you’d like to delete {inventory_name} from 
                the inventory list. You won’t be able to undo this 
                action.
            </p1>
        </>
    )
}

export default InventoryDeleteModal;