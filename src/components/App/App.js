import React from 'react'
import LoaderContext from '../../context/LoaderContext'
import {useStore} from '../../utils/store';
import Home from '../../pages/Home/Home';
import Loader from '../Loader/Loader'

export default function App() {
  const setIsLoading = useStore((state) => state.setIsLoading);

  return (
    <LoaderContext.Provider value={{isLoading: setIsLoading}}>
      <Home />
      <Loader />
    </LoaderContext.Provider>
  );
}
