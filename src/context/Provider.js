import React, { createContext, useReducer } from "react";
import reducer from "./reducers";
import initState from "./initStates/initState";
import loginReducer from "./reducers/loginReducer";
import initStateLogin from "./initStates/initStateLogin";
import transaksiReducer from "./reducers/transaksiReducer";
import initStateTransaksi from "./initStates/initStateTransaksi";
import dashboardReducer from "./reducers/dashboardReducer";
import initStateDashboard from "./initStates/initStateDashboard";

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

  // Login
  const [loginState, loginDispatch] = useReducer(loginReducer, initStateLogin);

  // Cek User
  const [userState, userDispatch] = useReducer(loginReducer, initStateLogin);

  // Transaksi
  const [transaksiState, transaksiDispatch] = useReducer(
    transaksiReducer,
    initStateTransaksi
  );

  // Dashboard
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    initStateDashboard
  );

  return (
    <GlobalContext.Provider
      value={{
        agentTravelState,
        agentTravelDispatch,
        paketWisataState,
        paketWisataDispatch,
        loginState,
        loginDispatch,
        userState,
        userDispatch,
        transaksiState,
        transaksiDispatch,
        dashboardState,
        dashboardDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
