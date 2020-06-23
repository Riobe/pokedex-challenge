import React, { useContext } from 'react';

import './PokemonTiles.css';

import PokedexContext from '../util/PokedexContext';

import PokemonTile from './PokemonTile';

function PokemonTiles({ pokemon, search }) {
  const pokedex = useContext(PokedexContext);

  let filteredPokedex = pokedex;
  if (search.name || search.types.length || search.weaknesses.length) {
    const searchRegex = search.isNameValid && search.name && new RegExp(search.name, 'i');

    filteredPokedex = pokedex.filter(pokemon => {
      if (searchRegex && !searchRegex.test(pokemon.name)) {
        return false;
      }

      if (search.types.length && !search.types.every(type => pokemon.type.includes(type))) {
        return false;
      }

      if (search.weaknesses.length && !search.weaknesses.every(type => pokemon.weaknesses.includes(type))) {
        return false;
      }

      return true;
    });
  }

  return (
    <div className="PokemonTiles">
      {filteredPokedex.map(pokemon => (
        <PokemonTile key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonTiles;
