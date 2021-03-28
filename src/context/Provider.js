import React, { createContext, useReducer } from "react";
import reducer from "./reducers";
import initState from "./initStates/initState";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  // Agent Travel
  const [agentTravelState, agentTravelDispatch] = useReducer(
    reducer,
    initState
  );

  // Paket Wisata
  const [paketWisataState, paketWisataDispatch] = useReducer(
    reducer,
    initState
  );

  return (
    <GlobalContext.Provider
      value={{
        agentTravelState,
        agentTravelDispatch,
        paketWisataState,
        paketWisataDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
