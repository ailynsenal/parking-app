import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const initialState = {
    parkingLots: [
        [
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ]
        ],
        [
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ]
        ],
        [
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ]
        ],
        [
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ]
        ],
        [
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ],
          [
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            },
            {
              "plateNumber": ""
            }
          ]
        ]
    ],
    parkedCars: [],
    unparkedCars: [],
    addedEntrances: [],
    plateNumber: '',
    isLoading: true,
    isError: false,
}

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const domainUrl = "http://localhost:3001";

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    const getAddedEntrances = async ( payload ) => {
        axios
            .get(`${domainUrl}/added-entrances`)
            .then( response => {
                dispatch({
                    type: 'GET_ADDED_ENTRANCES',
                    payload: response.data
                })
            })
    }

    const addEntrances = async ( payload ) => {
        axios
            .post(`${domainUrl}/added-entrances`, payload, config)
            .then( response => {
                dispatch({
                    type: 'ADD_ENTRANCE',
                    payload: response.data
                })
            })
    }

    const deleteEntrance = async ( payload ) => {
        axios
            .delete(`${domainUrl}/added-entrances/${state.addedEntranceList.length}`)
            .then( response => {
                debugger;
                dispatch({
                    type: 'DELETE_ENTRANCE',
                    payload: response.data
                })
            })
    }

    const getParkedCars = async ( payload ) => {
        axios
            .get(`${domainUrl}/parked-cars`)
            .then( response => {
                updateParkingList(response.data);
                dispatch({
                    type: 'GET_PARKED_CARS',
                    payload: response.data
                })
            })
    }

    const updateParkingList = (data) => {
        if (data.length === 0) return; 
        data.forEach((car) => {
            updateSlotObj(car);
        });
    }

    const updateSlotObj = (obj, overridePlateNum = false) => {
        const { id, plateNumber, size, slotLocation, timeIn, timeOut, originalTimeIn, wasParked} = obj;
        if (state.parkingLots.length) {
            state.parkingLots[slotLocation[0]][slotLocation[1]][slotLocation[2]] = {
                id,
                plateNumber: plateNumber,
                size,
                slotLocation,
                timeIn,
                timeOut,
                originalTimeIn,
                wasParked
            }
        }
    }

    const toParkCars = async ( payload ) => {
        const { plateNumber, wasParked} = payload;
        let encodedPlateNumber = encodeURIComponent(plateNumber);
        let axiosCall;

        if (wasParked) {
            axiosCall = axios.put(`${domainUrl}/parked-cars/${encodedPlateNumber}`, payload, config)
            .then(response => {
              updateSlotObj(response.data);
                dispatch({
                    type: 'PARK_CARS',
                    payload: response.data
                });
            })
        }
        else {
            axiosCall = axios.post(`${domainUrl}/parked-cars`, payload, config)
            .then(response => {
                updateSlotObj(response.data);
                dispatch({
                    type: 'PARK_CARS',
                    payload: response.data
                });
            })
        }
    }

    // parking fee calculation
    const getHourlyRate = (slotSize) => {
        let hourlyRate = 0;
        hourlyRate = slotSize === 0 ? 20 : slotSize === 1 ? 60 : 100;
        return hourlyRate;
    }

    const getDays = (hours) => {
        if (hours >= 24) return Math.floor(hours / 24);
    }

    const unParkCars = async ( payload ) => {
        const { originalTimeIn, timeIn, timeOut, plateNumber, slotSize } = payload;

        let total = 40;
        let extendedHours = 0;
        let encodedPlateNumber = encodeURIComponent(plateNumber);
        let hourlyRate = getHourlyRate(parseInt(slotSize));
        let returnWithInOneHour = originalTimeIn !== timeIn;

        // getting the difference of timeOut and timeIn
        const newTimeIn = new Date(timeIn);
        const newTimeOut = new Date(timeOut);
        const timeDiff = newTimeOut - newTimeIn;
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
                total += ((extendedHours - (days * 24)) * hourlyRate) + 5000;
            }
            else {
                total += extendedHours * hourlyRate;
            }
        }

        payload.total = total;
        payload.totalHrsOfPark = hours;
        console.log(total);
        axios
            .put(`${domainUrl}/parked-cars/${encodedPlateNumber}`, payload, config)
            .then(response => {
              debugger;
                const { slotLocation } = response.data;
                state.parkedCars.find(car => {
                  if (car.plateNumber === plateNumber) {
                    car.timeOut = response.data.timeOut;
                  }
                });
                state.parkingLots[slotLocation[0]][slotLocation[1]][slotLocation[2]].plateNumber = '';
                dispatch({
                    type: 'UNPARK_CARS',
                    payload: response.data
                });
            })
    }

    return (<GlobalContext.Provider value={{
        parkingLots: state.parkingLots,
        parkedCars: state.parkedCars,
        addedEntranceList: state.addedEntranceList,
        isLoading: state.isLoading,
        isError: state.isError,
        getAddedEntrances,
        addEntrances,
        deleteEntrance,
        getParkedCars,
        toParkCars,
        unParkCars
    }}>
        {children}
    </GlobalContext.Provider>);
}