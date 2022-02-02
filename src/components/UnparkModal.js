import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const UnparkModal = ({ slot }) => {
  const { toggleModal, unParkCars, parkingLots } = useContext(GlobalContext);

  const { id, plateNumber, size, timeIn, originalTimeIn, slotLocation, totalHrsOfPark, totalParkingFee, timeOut } = slot;
  const { days, hours, minutes, seconds } = totalHrsOfPark;

  //get the size of the car based on its index
  const getSize = (sizeIndex) => {
    return !sizeIndex? '': sizeIndex === '0'? 'SMALL': sizeIndex === '1'? 'MEDIUM': 'LARGE';
  }

  let getHoursText = minutes < 60 ? `${days} days, 0 hours, ${minutes} minutes` : `${days} days, ${hours} hours`;

  const unParkCar = () => {
    if (!plateNumber) return;
      parkingLots[slotLocation[0]][slotLocation[1]][slotLocation[2]].plateNumber = '';
      unParkCars({
          id,
          plateNumber,
          size,
          slotLocation: null,
          timeIn,
          originalTimeIn,
          timeOut,
          totalParkingFee,
          totalHrsOfPark,
          wasParked: false
      });
      toggleModal('')
  }

  const formatDate = (dateToFormat) => {
    let date  = new Date(dateToFormat);
    return date.toLocaleString();
  }

  return (
    <div id="myModal" className="modal">
      <div className='modal-content'>
        <div className="modal-header">
          <h3 className="modal-title">Parking Details</h3>
          <span className="close"
              onClick={() => toggleModal('')}>&times;</span>
        </div>
        <div className="content">
          <div className='info'>
            <span className='desc'>Plate Number:</span>
            <span className='value'>{plateNumber}</span>
          </div>
          <div className='info'>
            <span className='desc'>Time In:</span>
            <span className='value'>{formatDate(timeIn)}</span>
          </div>
          <div className='info'>
            <span className='desc'>Time Out:</span>
            <span className='value'>{formatDate(timeOut)}</span>
          </div>
          <div className='info'>
            <span className='desc'>No. of hours park:</span>
            <span className='value'>{getHoursText}</span>
          </div>
          <div className='info'>
            <span className='desc'>Lot Size:</span>
            <span className='value'>{getSize(size)}</span>
          </div>
          <div className='info'>
            <span className='desc'>Parking Fee:</span>
            <span className='value'>P{totalParkingFee}</span>
          </div>
        </div>
        <div className='button-wrapper'>
          <button type="button"
              className="park-btn"
              onClick={unParkCar}>
              UNPARK
          </button>
          <button type="button"
              className="park-btn"
              onClick={() => toggleModal('')}>
              CANCEL
          </button>
        </div>
      </div>
    </div>
  )
};
