import Navigation from "./Navigation";
import React from 'react';
import { FavoritesProvider } from '../Recipe-App/components/FavoritesContext'

export default function App() {

  return (
    <FavoritesProvider>
      <Navigation />
    </FavoritesProvider>
  );
}



