import { useState } from 'react';
import './DeleteWarehouse.scss'

function DeleteWarehouse({ warehouseId, warehouseName, handleDeleteWarehouse }) {
    const [showPopup, setShowPopup] = useState(true);
    const updateWarehouse = () => {
        handleDeleteWarehouse(warehouseId);
        setShowPopup(false);
    }
    useState(() => {
        setShowPopup(true);
    }, [showPopup])

    const cancelDelete = () => {
        setShowPopup(false);
    }

    return (
        <>
            {showPopup &&
                <div className="modal-overlay">
                    <div className="modal">
                        <section className='modal__title-cont'>
                            <h2 className='modal__title--title'>Delete {warehouseName} Warehouse ?</h2>
                            <p className='modal__title'>Please confirm that you'd like to delete the {warehouseName} from the list of warehouses. You won't be able to undo this action.</p>
                            <button onClick={cancelDelete} className='modal__button'>Cancel</button>
                            <button onClick={updateWarehouse} className='modal__button'>Delete</button>
                        </section>
                    </div>
                </div>
            }
        </>
    )
}

export default DeleteWarehouse;