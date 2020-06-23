import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@chakra-ui/core';

import './PokemonTile.css';

function PokemonTile({ pokemon }) {
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const ref = useRef();


  // When this element comes into view, set hasBeenSeen to true so that
  // the src attribute will get added and the image will be lazy loaded
  // when it is needed.
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    const currentRef = ref.current;
    let observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      setHasBeenSeen(true);
      observer.unobserve(currentRef);
      observer = undefined;
    });

    observer.observe(currentRef);

    return () => {
      if (observer) {
        if (currentRef && currentRef.current) {
          observer.unobserve(currentRef);
        }
        observer = undefined;
      }
    };
  }, [ref]);

  const srcProp = {};
  if (hasBeenSeen) {
    srcProp.src = pokemon.img;
  }

  return (
    <div className="PokemonTile" ref={ref}>
      <div className="PokemonTile-header">{`(${pokemon.id}) ${pokemon.name}`}</div>
      <img className="PokemonTile-img" alt={pokemon.name} loading="lazy" {...srcProp} />
      <div className="PokemonTile-types">
        {pokemon.type.map(pokemonType => (
          <Badge variant="solid" key={pokemonType} className={'type-background-' + pokemonType}>{pokemonType}</Badge>
        ))}
      </div>
    </div>
  );
}

export default PokemonTile;
