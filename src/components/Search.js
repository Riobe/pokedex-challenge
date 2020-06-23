import React, { useState } from 'react';
import { Input, Collapse } from '@chakra-ui/core';

import './Search.css';

import { pokemonTypes } from '../util/constants';

function Search({ search, onNameChange, onTypeToggle, onWeaknessToggle }) {
  // TODO: switch to false
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const typeSelected = type => search.types.includes(type) ? 'selected' : '';
  const weaknessSelected = type => search.weaknesses.includes(type) ? 'selected' : '';

  return (
    <div className="Search">
      <Input
        className="Search-input"
        onChange={e => onNameChange(e.target.value)}
        placeholder="Search Pokemon..."
        size="lg"
        isInvalid={!search.isNameValid}
      />
      <Collapse className="Search-advanced" isOpen={showAdvancedSearch}>
        <div className="Search-advanced-tags">
          {pokemonTypes.map(type => (
            <div key={type} className="Search-advanced-tag">
              <div className={`Search-advanced-tagname type-background-${type}`}>{type}</div>
              <div className={`Search-advanced-type ${typeSelected(type)}`} onClick={() => onTypeToggle(type)}>T</div>
              <div className={`Search-advanced-weakness ${weaknessSelected(type)}`} onClick={() => onWeaknessToggle(type)}>W</div>
            </div>
          ))}
        </div>
      </Collapse>
      <div className='Search-toggle'>
        <div onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>{showAdvancedSearch ? '˄' : '˅'}</div>
      </div>
    </div>
  );
}

export default Search;
