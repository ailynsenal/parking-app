import React, { useContext, useState } from 'react';
import { california } from 'license-plate-serial-generator';
import { GlobalContext } from '../context/GlobalState';

export const Entrance = ({ entranceNumber, index }) => {
    const [plateNumber, setPlateNumber] = useState('');
    const [size, setSize] = useState('0');
    const [isDuplicateEntry, setIsDuplicateEntry] = useState(false);
    const [isFullParking, setIsFullParking] = useState(false);
    const [isNullPlateNumber, setIsNullPlateNumber] = useState(false);

    const { toParkCars, parkingLots, parkedCars } = useContext(GlobalContext);

    const onClickGeneratePlateNumber = () => {
        const generatedPlateNumber = california();
        setPlateNumber(generatedPlateNumber);
        if (isDuplicateEntry) setIsDuplicateEntry(false);
        if (isFullParking) setIsFullParking(false);
        if (isNullPlateNumber) setIsNullPlateNumber(false);
    }

    const onChangePlateNumber = e => {
        const value = e.target.value;
        if (isDuplicateEntry) setIsDuplicateEntry(false);
        if (isFullParking) setIsFullParking(false);
        if (isNullPlateNumber) setIsNullPlateNumber(false);
        setPlateNumber(value);
    }

    const onChangeSize = e => {
        const value = e.target.value;
        setSize(value);
    }

    const getEntranceLocation = (entranceNum) => {
        let xDistance = entranceNum > 3 ? 4 : 0;
        let yDistance = index == 2 ? 2 : 1;

        switch(index) {
            case 0:
                return [xDistance, 0];
            default:
                return [xDistance, parseInt(index) + yDistance];
        };
    }

    const getNearestParkingSlot = (entranceNumber) => {
        const availableSlots = [];
        const nearestSlots = [];

        let entrancePoints = getEntranceLocation(entranceNumber);
        parkingLots.forEach((parkingLot, index) => {
            let rowIndex = index;
            parkingLot.forEach((slots, index) => {
                let slotIndex = index;
                slots.filter((slot, index) => {
                    if (size === '0') {
                        if (slot.slotLocation ===  "") {
                            availableSlots.push({
                                location: `${rowIndex}${slotIndex}${index}`
                            });
                        }
                    }
                    else if (size === '1') {
                        if (slot.slotLocation === "" && index !== 0) {
                            availableSlots.push({
                                location: `${rowIndex}${slotIndex}${index}`
                            });
                        }
                    }
                    else {
                        if (slot.slotLocation === "" && index === 2) {
                            availableSlots.push({
                                location: `${rowIndex}${slotIndex}${index}`
                            });
                        }
                    }
                    return availableSlots;
                });
            });
        });

        if (availableSlots.length === 0) {
            setIsFullParking(true);
            setPlateNumber('');
            return;
        }

        let availableSlotList = entranceNumber > 3 ? availableSlots.reverse() : availableSlots;
        let slotToPark = availableSlotList.map((slot) => {
            let distance = slot.location.split('');
            // calculated based on cartersian plane formula
            slot.distanceLocation = Math.sqrt((Math.pow(getDistance(distance[0], entrancePoints[0]), 2) + Math.pow(getDistance(distance[1], entrancePoints[1]), 2)));
            nearestSlots.push(slot.distanceLocation);
        });

        // get the minimum distance based on available
        let getMinDistance = Math.min(...nearestSlots);
        let nearestParkingLot  = availableSlotList.find((slot) => {
            if (slot.distanceLocation === getMinDistance) {
                return slot;
            }
        });
        return nearestParkingLot;
    }

    const park = e => {
        e.preventDefault();
        if (!plateNumber) {
            setIsNullPlateNumber(true);
            return;
        };
        const value = e.target.value;
        // check if the car is already park or a returned car
        const parkedCar = parkedCars.find(car => car.plateNumber === plateNumber);
        let getParkingSlot = getNearestParkingSlot(value);
        if (!parkedCar && !isFullParking) {
            toParkCars({
                id: plateNumber,
                plateNumber,
                slotLocation: getParkingSlot.location,
                size,
                timeIn: new Date().toISOString(),
                originalTimeIn: new Date().toISOString(),
                timeOut: null,
                wasParked:  false,
            });
        }
        else {
            // if the car has no timeOut, it means its a duplicate entry
            const { timeOut } = parkedCar;
            if (!timeOut) {
                setIsDuplicateEntry(true);
            }
            else {
                // check if a returned car
                const { timeIn, timeOut, originalTimeIn } = parkedCar;
                const returnWithInOneHour = getMinutes(timeIn, timeOut) < 60;
                if (returnWithInOneHour) {
                    toParkCars({
                        id: plateNumber,
                        plateNumber,
                        slotLocation: getParkingSlot.location,
                        size,
                        timeIn,
                        originalTimeIn,
                        timeOut: null,
                        wasParked:  true,
                    });
                }
                else {
                    toParkCars({
                        id: plateNumber,
                        plateNumber,
                        slotLocation: getParkingSlot.location,
                        size,
                        timeIn: new Date().toISOString(),
                        originalTimeIn: new Date().toISOString(),
                        timeOut: null,
                        wasParked: true,
                    });
                }
            }
        }
        setPlateNumber('');
    }

    // getting the difference of timeOut and timeIn
    const getMinutes = (timeIn, timeOut) => {
        const newTimeIn = new Date(timeIn);
        const newTimeOut = new Date(timeOut);
        const timeDiff = newTimeOut - newTimeIn;
        const msec = timeDiff;
        return Math.ceil(msec / 1000 / 60);
    }

    // getting the distance of x and y
    const getDistance = (x, y) => {
        return parseInt(x) - y;
    }

    return (
        <>
            <div className="entrance">
                <div className='entrance-content'>
                    <button type="button"
                        className="generate-plate-number"
                        onClick={onClickGeneratePlateNumber}>
                        GENERATE
                    </button>
                    <input type="text"
                        className="input-plate"
                        placeholder="Plate Number"
                        name="entrance"
                        value={plateNumber}
                        onChange={onChangePlateNumber}
                    />

                    <select id="car-sizes"
                        value={size}
                        onChange={onChangeSize}>
                        <option value="0">Small</option>
                        <option value="1">Medium</option>
                        <option value="2">Large</option>
                    </select>

                    <button type="button"
                        className="park-btn"
                        value={entranceNumber}
                        onClick={park}>
                        PARK
                    </button>
                </div>

                {(isDuplicateEntry) &&
                    <p className="alert">
                        Car is already parked!
                    </p>
                }
                {(isNullPlateNumber) &&
                    <p className="alert">
                        Please input or generate plate number!
                    </p>
                }
                {(isFullParking) &&
                    <p className="alert">
                        No available slot for chosen car size!
                    </p>
                }
            </div>
        </>
  );
};
