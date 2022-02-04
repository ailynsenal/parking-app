import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

const initialState = {
    parkingLots: [
        [
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ]
        ],
        [
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ]
        ],
        [
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ]
        ],
        [
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ]
        ],
        [
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ],
          [
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
            {
              "plateNumber": "",
              "slotLocation": "",
            },
          ]
        ]
    ],
    parkedCars: [],
    unparkedCars: [],
    addedEntranceList: [],
    plateNumber: '',
    modalState: '',
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
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
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
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
    }

    const deleteEntrance = async ( payload ) => {
        axios
            .delete(`${domainUrl}/added-entrances/${state.addedEntranceList.length}`)
            .then( response => {
              dispatch({
                  type: 'DELETE_ENTRANCE',
                  payload: response.data
              })
            })
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
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
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
    }

    const updateParkingList = (data) => {
        if (data.length === 0) return;
        data.forEach((car) => {
          dispatch({
            type: 'UPDATE_PARKING_LISTS',
            payload: car
          });
        });
    }

    const toParkCars = async ( payload ) => {
        const { plateNumber, wasParked} = payload;
        let encodedPlateNumber = encodeURIComponent(plateNumber);
        let axiosCall;

        if (wasParked) {
            axiosCall = axios.put(`${domainUrl}/parked-cars/${encodedPlateNumber}`, payload, config)
            .then(response => {
              dispatch({
                type: 'UPDATE_PARKING_LISTS',
                payload: response.data
              });
              dispatch({
                  type: 'PARK_CARS',
                  payload: response.data
              });
            })
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
        }
        else {
            axiosCall = axios.post(`${domainUrl}/parked-cars`, payload, config)
            .then(response => {
              dispatch({
                type: 'UPDATE_PARKING_LISTS',
                payload: response.data
              });
              dispatch({
                  type: 'PARK_CARS',
                  payload: response.data
              });
            })
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
        }
    }

    const unParkCars = async ( payload ) => {
        const { plateNumber } = payload;
        let encodedPlateNumber = encodeURIComponent(plateNumber);
        axios
            .put(`${domainUrl}/parked-cars/${encodedPlateNumber}`, payload, config)
            .then(response => {
              dispatch({
                  type: 'UNPARK_CARS',
                  payload: response.data
              });
            })
            .catch(() => {
              dispatch({
                type: 'ERROR',
                payload: true
              })
            });
    }

    const toggleModal = toggleModalState => {
      dispatch({
        type: 'TOGGLE_MODAL',
        payload: toggleModalState
      });
    }
  

    return (<GlobalContext.Provider value={{
        parkingLots: state.parkingLots,
        parkedCars: state.parkedCars,
        addedEntranceList: state.addedEntranceList,
        modalState: state.modalState,
        isLoading: state.isLoading,
        isError: state.isError,
        getAddedEntrances,
        addEntrances,
        deleteEntrance,
        getParkedCars,
        toParkCars,
        unParkCars,
        toggleModal
    }}>
        {children}
    </GlobalContext.Provider>);
}