import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IconButton, Badge } from '@chakra-ui/core';

import './Detail.css';

import PokedexContext from '../util/PokedexContext';

function Detail() {
  const { num } = useParams();
  const pokedex = useContext(PokedexContext);
  const pokemon = pokedex.find(p => p.num === num);

  return (
    <div className="Detail">
      <div className="Detail-header">
        <Link to="/"><IconButton className="Detail-back" aria-label="Return to main site" icon="arrow-left" /></Link>
        <div>Number: {pokemon.num},</div>
        <div>Name: {pokemon.name}</div>
      </div>
      <div className="Detail-evolutions">
        {pokemon.prev_evolution && pokemon.prev_evolution.map(previousEvolution => (
          <Link to={`/${previousEvolution.num}`} className="Detail-evolution" key={previousEvolution.num}>
            <div className="Detail-evolution-image">
              <img alt={previousEvolution.name} src={pokemon.img.replace(pokemon.num, previousEvolution.num)} />
            </div>
            <div className="Detail-evolution-name">{previousEvolution.name}</div>
          </Link>
        ))}
        <div className="Detail-current">
          <div className="Detail-current-image">
            <img alt={pokemon.name} src={pokemon.img} />
          </div>
          <div className="Detail-current-name">{pokemon.name}</div>
        </div>
        {pokemon.next_evolution && pokemon.next_evolution.map(nextEvolution => (
          <Link to={`/${nextEvolution.num}`} key={nextEvolution.num} className="Detail-evolution">
            <div className="Detail-evolution-image">
              <img alt={nextEvolution.name} src={pokemon.img.replace(pokemon.num, nextEvolution.num)} />
            </div>
            <div className="Detail-evolution-name">{nextEvolution.name}</div>
          </Link>
        ))}
      </div>
      <div className="Detail-types">
        <div className="Detail-types-header">Types:</div>
        <div className="Detail-types-badges">
          {pokemon.type.map(pokemonType => (
            <Badge variant="solid" key={pokemonType} className={'Detail-types-badge type-background-' + pokemonType}>{pokemonType}</Badge>
          ))}
        </div>
      </div>
      <div className="Detail-weaknesses">
        <div className="Detail-weaknesses-header">Weaknesses:</div>
        <div className="Detail-weaknesses-badges">
          {pokemon.weaknesses.map(pokemonWeakness => (
            <Badge variant="solid" key={pokemonWeakness} className={'Detail-weaknesses-badge type-background-' + pokemonWeakness}>{pokemonWeakness}</Badge>
          ))}
        </div>
      </div>
      <div className="Detail-dimensions">
        <div className="Detail-height">
            Height: {pokemon.height}
        </div>
        <div className="Detail-weight">
            Weight: {pokemon.weight}
        </div>
      </div>
    </div>
  );
}

export default Detail;
