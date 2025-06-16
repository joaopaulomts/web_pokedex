// app/pokemon/[name]/page.tsx

import Link from "next/link";
import Image from "next/image";

// --- Interfaces para garantir a estrutura dos dados ---
interface StatInfo {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: StatInfo;
}

interface PokemonTypeInfo {
  name: string;
}

interface PokemonType {
  type: PokemonTypeInfo;
}

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Stat[];
  types: PokemonType[];
  weight: number; // em hectogramas (hg) -> dividir por 10 para kg
  height: number; // em decímetros (dm) -> dividir por 10 para m
}

// --- Mapeamento de tipos de Pokémon para cores do Tailwind CSS ---
const typeColorMap: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-indigo-800",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

// --- Componente da Página de Detalhes ---
export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.name}`
    );
    if (!response.ok) {
      // Futuramente, criar uma página de "Não encontrado"
      return (
        <div className="text-center text-xl mt-10">Pokémon não encontrado!</div>
      );
    }

    const pokemon: Pokemon = await response.json();
    const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

    return (
      <main className="bg-slate-100 min-h-screen p-4 sm:p-8 flex flex-col items-center">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
          {/* Botão de Voltar */}
          <Link
            href="/"
            className="absolute top-4 left-4 text-slate-500 hover:text-slate-800 transition-colors"
          >
            &larr; Voltar
          </Link>

          {/* Informações de ID e Tipos */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-slate-500">
              N°{pokemon.id.toString().padStart(3, "0")}
            </span>
            <div className="flex gap-2">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className={`${
                    typeColorMap[typeInfo.type.name] || "bg-gray-400"
                  } text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Imagem e Nome */}
          <div className="text-center my-4">
            <div className="bg-gray-100 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={`Imagem do ${pokemon.name}`}
                width={180}
                height={180}
              />
            </div>
            <h1 className="text-5xl font-extrabold capitalize text-slate-800 mt-6">
              {pokemon.name}
            </h1>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-slate-700 mb-4">
              Estatísticas
            </h2>
            <div className="space-y-4 px-2">
              {" "}
              {/* Adicionado um pouco de padding horizontal */}
              {pokemon.stats.map((stat) => {
                // Define um stat máximo para calcular a porcentagem (ajuste se necessário)
                const maxStatValue = 200;
                const statPercentage = (stat.base_stat / maxStatValue) * 100;

                return (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-slate-600 capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <span className="text-sm font-medium text-slate-800">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      {/* CORREÇÃO APLICADA AQUI */}
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${statPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="text-center text-xl mt-10">
        Ocorreu um erro ao buscar o Pokémon.
      </div>
    );
  }
}
