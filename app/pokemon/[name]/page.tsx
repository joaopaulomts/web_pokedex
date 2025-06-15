// app/pokemon/[name]/page.tsx

// 1. DEFINA OS TIPOS DE FORMA ESPECÍFICA
interface StatInfo {
  name: string;
  url: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: StatInfo;
}

interface Pokemon {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Stat[]; // Use o tipo Stat[] aqui
}

export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  // 2. APLIQUE O TIPO 'Pokemon' AO RESULTADO
  const pokemon: Pokemon = await response.json();

  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-lg">
        <h1 className="text-4xl font-bold capitalize text-center">
          {pokemon.name}
        </h1>
        <img
          src={imageUrl}
          alt={`Imagem do ${pokemon.name}`}
          width={250}
          height={250}
          className="mx-auto my-4"
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Stats</h2>
          <ul>
            {/* 3. O ERRO SOME! TypeScript agora sabe o que é 'stat' */}
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="capitalize">
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
