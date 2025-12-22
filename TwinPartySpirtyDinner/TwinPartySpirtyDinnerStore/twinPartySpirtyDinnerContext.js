import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
export const StoreContext = createContext(undefined);
export const useStore = () => useContext(StoreContext);

export const ContextProvider = ({ children }) => {
  const [momentsTwinPartySpirtyDinner, setMomentsTwinPartySpirtyDinner] =
    useState([]);

  const loadMomentsTwinPartySpirtyDinner = async () => {
    const storedTwinPartySpirtyDinner = await AsyncStorage.getItem(
      'twin_party_moments',
    );
    setMomentsTwinPartySpirtyDinner(
      storedTwinPartySpirtyDinner
        ? JSON.parse(storedTwinPartySpirtyDinner)
        : [],
    );
  };

  const contextValues = {
    momentsTwinPartySpirtyDinner,
    setMomentsTwinPartySpirtyDinner,
    loadMomentsTwinPartySpirtyDinner,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
