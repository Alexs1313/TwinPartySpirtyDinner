import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export const ContextProvider = ({ children }) => {
  const [momentsTwinPartySpirtyDinner, setMomentsTwinPartySpirtyDinner] =
    useState([]);

  const loadMomentsTwinPartySpirtyDinner = async () => {
    try {
      const savedMoments = await AsyncStorage.getItem('twin_party_moments');

      if (!savedMoments) {
        setMomentsTwinPartySpirtyDinner([]);
        console.log('[Store] no moments found, initialized empty list');
        return;
      }

      try {
        const parsedJSON = JSON.parse(savedMoments);
        if (Array.isArray(parsedJSON)) {
          setMomentsTwinPartySpirtyDinner(parsedJSON);
          console.log('loaded moments, count=>', parsedJSON.length);
        } else {
          console.warn('fail: moments in storage are not an array, resetting');
          setMomentsTwinPartySpirtyDinner([]);
        }
      } catch (parseErr) {
        console.warn('failed JSON', parseErr);
        setMomentsTwinPartySpirtyDinner([]);
      }
    } catch (err) {
      console.error('failed =>', err);
      setMomentsTwinPartySpirtyDinner([]);
    }
  };

  const persistMomentsTwinPartySpirtyDinner = async nextArray => {
    try {
      if (!Array.isArray(nextArray)) {
        console.warn('fail: not an array');
        return;
      }
      await AsyncStorage.setItem(
        'twin_party_moments',
        JSON.stringify(nextArray),
      );
      console.log('count=>', nextArray.length);
    } catch (err) {
      console.error('failed', err);
    }
  };

  const contextValues = {
    momentsTwinPartySpirtyDinner,
    setMomentsTwinPartySpirtyDinner,
    loadMomentsTwinPartySpirtyDinner,
    persistMomentsTwinPartySpirtyDinner,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
