import Navigation from "./Navigation";
import React from 'react';
import { FavouritesProvider } from './components/FavouritesContext'

export default function App() {

  return (
    <FavouritesProvider>
      <Navigation />
    </FavouritesProvider>
  );
}



