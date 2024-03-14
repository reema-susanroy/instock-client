// import { useState } from 'react';
// import './DeleteWarehouse.scss'

// function DeleteWarehouse({ warehouseId, warehouseName, warehouse, handleDeleteWarehouse }) {
//     const [showPopup, setShowPopup] = useState(true);
//     const [warehouseData, setWarehouseData] = useState(warehouse);


//     const [isModalOpen, setIsModalOpen] = useState(false);
//     // Other state variables related to the modal

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => {
//         // Reset modal-related state
//         setIsModalOpen(false);
//         // Reset other modal-related state variables to their initial values
//         // Example: setOtherStateVariable(initialValue);
//     };

//     const updateWarehouse = () => {
//         handleDeleteWarehouse(warehouseId);
//         setShowPopup(false);
//     }

//     const cancelDelete = () => {
//         setShowPopup(false);
//         setWarehouseData(warehouse)
//     }

//     return (
//         <>

//             {showPopup &&
//                 <div className="modal-overlay">
//                     <div className="modal">
//                         <section className='modal__title-cont'>
//                             <h2 className='modal__title--title'>Delete {warehouseName} Warehouse ?</h2>
//                             <p2 className='modal__title'>Please confirm that you'd like to delete the {warehouseName} from the list of warehouses. You won't be able to undo this action.</p2>

//                         </section>
//                         <section className='modal__button'>
//                             <span className="close" onClick={closeModal}>&times;</span>
//                             {/* Modal content */}
//                             <button onClick={cancelDelete} className='modal__button--cancel'>Cancel</button>
//                             <button onClick={updateWarehouse} className='modal__button--delete'>Delete</button>
//                         </section>
//                     </div>
//                 </div>
//             }

//         </>
//     )
// }

// export default DeleteWarehouse;