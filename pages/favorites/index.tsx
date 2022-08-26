import PokemonProvider from "../../components/context";
import { Layout } from "../../components/layout";
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { Pokemon } from "../../interfaces";

const FavoritesPage = () => {

  const {favorites} = PokemonProvider();

  return (
      <Layout title='Pokémons - Favoritos'>
        <h1>Favoritos</h1>
       
        {
          favorites.map( ( pokemon: Pokemon ) => (
            <Grid.Container key ={pokemon.id} css={{ marginTop: '5px' }} gap={ 2 }>
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
           </Grid.Container>
          ))
        }

      </Layout>
  )
};

export default FavoritesPage;