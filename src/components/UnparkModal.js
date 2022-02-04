import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const UnparkModal = ({ slot, slotIndex}) => {
  const { toggleModal, unParkCars, parkingLots } = useContext(GlobalContext);

  const { id, plateNumber, size, timeIn, originalTimeIn } = slot;

  const timeOut = new Date().toISOString();
  let totalParkingFee;
  let totalHrsOfPark = {};

  //get the size of the car based on its index
  const getSize = (sizeIndex) => {
    return !sizeIndex? '': sizeIndex === '0'? 'SMALL': sizeIndex === '1'? 'MEDIUM': 'LARGE';
  }

  // get the difference of timeOut and timeIn
  const getMinutes = (timeIn, timeOut) => {
    const newTimeIn = new Date(timeIn);
    const newTimeOut = new Date(timeOut);
    const timeDiff = newTimeOut - newTimeIn;
    const msec = timeDiff;
    return Math.ceil(msec / 1000 / 60);
  }

  const getHoursText = (totalHrsOfPark) => {
    const { days, hours, minutes } = totalHrsOfPark;
    return minutes < 60 ? `${days} days, 0 hours, ${minutes} minutes` : `${days} days, ${hours} hours`
  };

  const getHourlyRate = (slotSize) => {
    let hourlyRate = 0;
    hourlyRate = slotSize === 0 ? 20 : slotSize === 1 ? 60 : 100;
    return hourlyRate;
  }

  // parking fee calculation
  const getTimeDiff = (timeOut) => {
    let returnWithInOneHour = getMinutes(timeIn, timeOut) < 60;
    const newTimeIn = returnWithInOneHour ? originalTimeIn : timeIn;
    const newTimeOut = new Date(timeOut);
    return newTimeOut - new Date(newTimeIn);
  }

  const getDays = (hours) => {
    if (hours >= 24) return Math.floor(hours / 24);
  }

  const calculateParkingFee = () => {
    let extendedHours = 0;
    let excessHours = 0;
    let days = 0;
    let total = 40;
    let hourlyRate = getHourlyRate(parseInt(slotIndex));

    // getting the difference of timeOut and timeIn
    const timeDiff = getTimeDiff(timeOut);
    const msec = timeDiff;
    const hours = Math.round(((msec / 1000) / 60) / 60);
    const minutes = Math.ceil(msec / 1000 / 60);
    const seconds = Math.round(msec / 1000);

    // we first substract the 3 hours flat rate that cost 40 pesos
    // then check if the extended hour corresponds to days
    // then get the remaining hours from the days (if any)
    if (hours > 3) {
        extendedHours = hours - 3;
        days = getDays(extendedHours);
        if (days >= 1) {
        excessHours = extendedHours - (days * 24);
        total += (excessHours * hourlyRate) + ( days * 5000 ) ;
        }
        else {
            total += extendedHours * hourlyRate;
        }
    }

    let tempDays = getDays(hours) ? getDays(hours) : 0;

    totalParkingFee = total;
    totalHrsOfPark = {
        days: tempDays,
        hours: hours - (tempDays * 24),
        minutes,
        seconds
    };
  }

  calculateParkingFee();

  const unParkCar = () => {
    if (!plateNumber) return;
    slot.timeOut = timeOut;
    slot.slotLocation = "";
    slot.wasParked = false;
    slot.totalParkingFee = totalParkingFee;
    slot.totalHrsOfPark = totalHrsOfPark;
    unParkCars(slot);
    toggleModal('');
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
            <span className='value'>{getHoursText(totalHrsOfPark)}</span>
          </div>
          <div className='info'>
            <span className='desc'>Car Size:</span>
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
