// app/page.tsx

import Link from "next/link";
import Image from "next/image"; // Usaremos o componente Image do Next.js para otimização

// --- Interfaces para definir a estrutura dos dados ---
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

// --- Componente da Página Principal ---
export default async function Home() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data: PokemonListResponse = await response.json();
  const pokemons = data.results;

  return (
    <main className="bg-slate-100 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Título com um estilo mais impactante */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-800 tracking-tight">
            Pokédex
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Explore a primeira geração de Pokémon
          </p>
        </div>

        {/* Grade de Pokémon com responsividade e espaçamento aprimorados */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {pokemons.map((pokemon) => {
            // Extrai o ID do Pokémon da URL para montar a URL da imagem
            const pokemonId = pokemon.url.split("/")[6];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

            return (
              <Link href={`/pokemon/${pokemon.name}`} key={pokemonId}>
                {/* O Card do Pokémon */}
                <div className="group bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                  {/* Imagem do Pokémon com fundo sutil */}
                  <div className="bg-gray-200 rounded-full p-3 mb-4">
                    <Image
                      src={imageUrl}
                      alt={`Imagem do ${pokemon.name}`}
                      width={120}
                      height={120}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Nome e Número do Pokémon */}
                  <div className="mt-auto">
                    <p className="text-sm font-semibold text-slate-500">
                      N°{pokemonId.toString().padStart(3, "0")}
                    </p>
                    <h2 className="text-lg font-bold text-slate-800 capitalize mt-1">
                      {pokemon.name}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
