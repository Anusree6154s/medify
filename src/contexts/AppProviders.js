import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { CityContext } from './cityContext';
import { StateContext } from './stateContext';

const AppProviders = ({ children }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  return (
    <StateContext.Provider value={{ state, setState }}>
      <CityContext.Provider value={{ city, setCity }}>
        <SnackbarProvider maxSnack={3}>
          {children}
        </SnackbarProvider>
      </CityContext.Provider>
    </StateContext.Provider>
  );
};

export default AppProviders;
