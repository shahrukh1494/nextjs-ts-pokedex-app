import Layout from "../components/Layout";
import Link from "next/Link";

interface PokemonProps {
  singlePokemon: {
    id: number;
    name: string;
    sprites?: { other: { dream_world: { front_default: string } } };
    abilities?: { ability: { name: string } }[];
    moves?: { move: { name: string } }[];
    height?: number;
    weight?: number;
  };
}

export default function pokemon({ singlePokemon }: PokemonProps) {
  return (
    <Layout title={singlePokemon.name}>
      <h2 className="poke-name">
        {singlePokemon.id}. {singlePokemon.name}
      </h2>
      <img
        className="poke-image"
        src={singlePokemon.sprites.other.dream_world.front_default}
        alt={singlePokemon.name}
      />
      <div className="details-card">
        <p>
          <span className="detail-label">Abilities :</span>
          {singlePokemon.abilities.map((detail, index: number) =>
            index === singlePokemon.abilities.length - 1 ? (
              <span key={detail.ability.name}> {detail.ability.name} </span>
            ) : (
              <span key={detail.ability.name}> {detail.ability.name}, </span>
            )
          )}
        </p>
        <p>
          <span className="detail-label">Height : </span>
          {singlePokemon.height}
        </p>
        <p>
          <span className="detail-label">Weight :</span> {singlePokemon.weight}
        </p>
        <p>
          <span className="detail-label"> Moves :</span>
          {singlePokemon.moves.map((moveName, index: number) =>
            index === singlePokemon.moves.length - 1 ? (
              <span key={moveName.move.name}> {moveName.move.name} </span>
            ) : (
              <span key={moveName.move.name}> {moveName.move.name}, </span>
            )
          )}
        </p>
      </div>

      <p>
        <Link href="/">
          <a className="home-link">Back to Home</a>
        </Link>
      </p>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const singlePokemon = await res.json();

    return {
      props: { singlePokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
