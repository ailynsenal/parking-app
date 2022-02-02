import React, { useContext } from 'react';
import { MdDirectionsCar } from 'react-icons/md';
import { GlobalContext } from '../context/GlobalState';

import { UnparkModal } from './UnparkModal';

export const Slot = ({rowIndex, parkingSlotIndex, slotIndex, slot}) => {
    const { unParkCars, parkedCars, toggleModal, modalState } = useContext(GlobalContext);

    const { id, plateNumber, size, slotLocation, timeIn, originalTimeIn} = slot;

    // get the size of the car based on its index
    const getSize = (sizeIndex) => {
        return !sizeIndex? '': sizeIndex === '0'? 'S': sizeIndex === '1'? 'M': 'L';
    }
    // do not display plateNumber if car has timeOut value (served as unpark car)
    const carParkedPlateNumber = slot.plateNumber ? plateNumber : '-';
    // the size of the car parked on this slot
    const carParkedSize = slot.plateNumber ? getSize(size) : '';

    const onClickSlot = () => {
        if (!slot.plateNumber) return;
        calculateParkingFee();
        toggleModal(id);
    }

    const getHourlyRate = (slotSize) => {
        let hourlyRate = 0;
        hourlyRate = slotSize === 0 ? 20 : slotSize === 1 ? 60 : 100;
        return hourlyRate;
    }

    // parking fee calculation
    const getTimeDiff = (timeOut) => {
        let returnWithInOneHour = originalTimeIn !== timeIn;
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
        let timeOut = new Date().toISOString();
        let totalHrsOfPark = {};
        let total = 40;
        let hourlyRate = getHourlyRate(parseInt(size));

        // getting the difference of timeOut and timeIn
        const timeDiff = getTimeDiff(timeOut);
        const msec = timeDiff;
        const hours = Math.ceil(((msec / 1000) / 60) / 60);
        const minutes = Math.ceil(msec / 1000 / 60);
        const seconds = Math.ceil(msec / 1000);

        // we first substract the 3 hours flat rate that cost 40 pesos
        // then check if the extended hour corresponds to days
        // then get the remaining hours from the days (if any)
        if (hours > 3) {
            extendedHours = hours - 3;
            let days = getDays(extendedHours);
            if (days >= 1) {
            excessHours = extendedHours - (days * 24);
            total += (excessHours * hourlyRate) + ( days * 5000 ) ;
            }
            else {
                total += extendedHours * hourlyRate;
            }
        }
        slot.timeOut = timeOut;
        slot.totalParkingFee = total;
        slot.totalHrsOfPark = {
            days,
            hours,
            minutes,
            seconds
        };
    }
    
    return (
        <>
            { modalState === id && 
                <UnparkModal slot={slot} />
            }
            <div className="slot"
                onClick={() => slotLocation ? onClickSlot() : ''}>

                <div className={`size size-${getSize(slotIndex)}`}>
                    <span className='car-parked-size'>{carParkedSize}</span>
                    <span className="slot-number">{`${rowIndex}-${parkingSlotIndex}-${slotIndex}`}</span>
                    <div className="slot-content">
                        <div className="plate-number">
                            <MdDirectionsCar size="2em" className='car-icon'/>
                            <span>{carParkedPlateNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
