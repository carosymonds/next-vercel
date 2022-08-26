

import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import React, {useState} from "react";
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import { Layout } from '../../components/layout';
import PokemonProvider from '../../components/context';
import confetti from 'canvas-confetti';
import { getPokemonInfo } from '../../components/context/getPokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {    
    const {addFavorite, favorites, existInFavorites} = PokemonProvider();
    
    const [isInFavorites, setIsInFavorites] = useState(existInFavorites(pokemon.id))

    const saveFavorite = () => {
      addFavorite(pokemon)
      // setIsInFavorites(!isInFavorites);
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        }
      });
    }

    return (
        <Layout title={pokemon.name}>
           <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
              <Grid xs={ 12 } sm={ 4 } >
                <Card isHoverable css={{ padding: '30px' }}>
                    <Card.Body>
                      <Card.Image 
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                        alt={ pokemon.name }
                        width="100%"
                        height={ 200 }
                      />
                    </Card.Body>
                </Card>
              </Grid>
              <Grid xs={ 12 } sm={ 8 }>
                <Card>
                  <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text h1 transform='capitalize'>{ pokemon.name }</Text>

                    <Button
                      color="gradient"
                      ghost={!isInFavorites}
                      onClick={() => saveFavorite()}
                    >
                      { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Text size={30}>Sprites:</Text>
                    <Container direction='row' display='flex' gap={ 0 }>
                        <Image 
                          src={ pokemon.sprites.front_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.front_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />

                    </Container>
                  </Card.Body>  
                </Card>
              </Grid>

           </Grid.Container>
        </Layout>
    )
};


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }` );

  return {
    paths: pokemons151.map( id => ({
      params: { id }
    })),
    fallback: false
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  return {
    props: {
      pokemon: pokemon
    }
  }
}





export default PokemonPage;