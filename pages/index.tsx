import Link from "next/Link";
import Layout from "../components/Layout";

interface results {
  name: string;
}

interface PokeProps {
  pokemon: { results: results[] };
}

export default function Home({ pokemon }: PokeProps) {
  return (
    <Layout title="NextJS Typescript Pokedex">
      <ul>
        {pokemon.results.map((singlePokemon: results, index: number) => (
          <li key={singlePokemon.name}>
            <Link href={`/PokemonDetails?id=${index + 1}`}>
              <a>
                <span>#{index + 1}. </span>
                {singlePokemon.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const pokemon = await res.json();

    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
