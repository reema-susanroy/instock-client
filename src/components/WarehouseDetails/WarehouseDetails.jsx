import './WarehouseDetails.scss'

import backIcon from '../../assets/icons/arrow_back-24px.svg'
import edit from '../../assets/icons/edit-24px.svg'
import { Link } from 'react-router-dom'

function WarehouseDetails({ currentData }) {
    console.log(currentData)
    return (
        <div className='warehouse_details'>
            <div className='warehouse_details__header-cont'>
                <div className='warehouse_details__header'>
                    <Link to='/warehouses' >
                        <img className='warehouse_details__header--back-arrow' src={backIcon} alt="back-arrow" />
                    </Link>
                    <h1>{currentData.warehouse_name}</h1>
                </div>
                <div className='warehouse_details__header-edit'>
                    <Link to={`/warehouses/${currentData.id}/edit`}>
                        <img className='warehouse_details__header--edit' src={edit} alt="edit" />
                    </Link>
                </div>
            </div>
            <div className='warehouse_details__content-cont'>
                <div className='warehouse_details__content--address'>
                    <h3 className='warehouse_details__content--label'>WAREHOUSE ADDRESS:</h3>
                    <div className='warehouse_details__content--address-data'> <p> {`${currentData.address}, `}</p>
                        <p> {`${currentData.city}, ${currentData.country} `}</p> </div>
                </div>
                <div className='warehouse_details__content--contact'>

                    <div><h3 className='warehouse_details__content--label' >CONTACT NAME:</h3>
                        <p>{currentData.contact_name}</p>
                        <p>{currentData.contact_position}</p>
                    </div>
                    <div><h3 className='warehouse_details__content--label' >CONTACT INFORMATION:</h3>
                        <p>{currentData.contact_phone}</p>
                        <p>{currentData.contact_email}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WarehouseDetails;