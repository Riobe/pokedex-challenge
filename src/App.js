import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider, theme, Spinner } from '@chakra-ui/core';
import './App.css';

import PokedexContext from './util/PokedexContext';
import Layout from './Layout';

const pokedexUrl = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

function App() {
  const [pokedexData, setPokedexData] = useState();

  useEffect(() => {
    const getPokedexJson = async () => {
      const res = await fetch(pokedexUrl);
      const pokedexJson = await res.json();

      setPokedexData(pokedexJson.pokemon);
    };

    getPokedexJson();
  }, [setPokedexData]);

  return (
    <ThemeProvider theme={theme}>
      <PokedexContext.Provider value={pokedexData}>
        {!pokedexData ? (
          <div className="App-loading">
            <Spinner size="xl" />
          </div>
        ) : (
          <Router>
            <Layout />
          </Router>
        )}
      </PokedexContext.Provider>
    </ThemeProvider>
  );
}

export default App;
