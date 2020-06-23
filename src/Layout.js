import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import produce from 'immer';

import './Layout.css';

import Search from './components/Search';
import PokemonTiles from './components/PokemonTiles';

function isAlphaInput(string) {
 return /^[a-zA-Z]*$/gi.test(string);
}

function Layout() {
  const [search, setSearch] = useState({
    name: '',
    types: [],
    weaknesses: [],
    isNameValid: true
  });

  return (
    <div className="Layout">
      <Switch>
        <Route path="/">
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
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
