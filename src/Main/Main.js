import React, { useState } from 'react';
import produce from 'immer';

import './Main.css';

import Search from './Search';
import PokemonTiles from './PokemonTiles';

function isAlphaInput(string) {
 return /^[a-zA-Z]*$/gi.test(string);
}

function Main() {
  const [search, setSearch] = useState({
    name: '',
    types: [],
    weaknesses: [],
    isNameValid: true
  });

  return (
    <div className="Main">
      <Search
        search={search}
        onNameChange={newSearch => setSearch(produce(draftSearch => {
          draftSearch.name = newSearch;
          draftSearch.isNameValid = isAlphaInput(newSearch);
        }))}

        onTypeToggle={type => setSearch(produce(draftSearch => {
          const adding = !draftSearch.types.includes(type);

          if (adding) {
            draftSearch.types.push(type);

            if (draftSearch.types.length > 2) {
              draftSearch.types.shift();
            }
          } else {
            draftSearch.types.splice(draftSearch.types.indexOf(type));
          }
        }))}

        onWeaknessToggle={type => setSearch(produce(draftSearch => {
          const adding = !draftSearch.weaknesses.includes(type);

          if (adding) {
            draftSearch.weaknesses.push(type);
          } else {
            draftSearch.weaknesses.splice(draftSearch.weaknesses.indexOf(type));
          }
        }))}
      />

      <PokemonTiles search={search} />
    </div>
  );
}

export default Main;
