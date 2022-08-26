import React from "react";
import { Card, Grid, Row, Text, Link } from "@nextui-org/react";
import { SmallPokemon } from "../../interfaces";
import { useRouter } from "next/router";

interface Props {
  pokemon: SmallPokemon;
}
export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/pokemon/${pokemon.id}`)
  };

  return (
    <Grid key={pokemon.url} xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onClick={onClick}>
        <Card.Body css={{ py: "$1" }}>
          <Card.Image src={pokemon.img}></Card.Image>
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{pokemon.name}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
