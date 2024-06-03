import { useState, useEffect, useRef } from 'react';
import { listPokemon } from '../interfaces/listPokemon';
import { Pokemon } from '../interfaces/pokemon';

function Pokedex() {

  const [pokedex, setPokedex] = useState<listPokemon[]>([]);

  const [pokemon, setPokemon] = useState<Pokemon>(
   {
    abilities:[],
    base_experience:0,
    cries: {},
    forms:[],
    game_indices: [],
    height: 0,
    held_items:[],
    id:0,
    is_default:false,
    location_area_encounters:"",
    moves:[],
    name: "",
    order:0,
    past_abilities:[],
    past_types:[],
    species: {},
    sprites: {},
    stats: [],
    types: [],
    weight: 0
   }
  );

  const [selectPokemonUrl, setSelectPokemonUrl] = useState("https://pokeapi.co/api/v2/pokemon/1/");

  const [selectPokemonImage, setSelectPokemonImage] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const previousSelectPokemonUrl = useRef(selectPokemonUrl);


  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000')
      .then((response) => response.json())
      .then((pokemon) => setPokedex(pokemon.results))

    getPokemonData()

  }, [])


  useEffect(() => {
    if (previousSelectPokemonUrl.current !== selectPokemonUrl) {
      getPokemonData()
      previousSelectPokemonUrl.current = selectPokemonUrl
    }

  }, [selectPokemonUrl])


  const getPokemonData = () => {

    fetch(selectPokemonUrl)
      .then((response) => response.json())
      .then((data) => setPokemon(data))


  }


  const IncreaseSelectPokemon = () => {
    let nextPokemon = 0;
    if (scrollRef.current) {
      pokedex.map((pok, i) => pok.name === pokemon.name ? nextPokemon = i : "")
      setSelectPokemonUrl(pokedex[nextPokemon + 1].url)
      getPokemonData()

      scrollRef.current.scrollBy({
        top: 24,
        behavior: 'smooth'
      });

    }

  }

  const DecreaseSelectPokemon = () => {
    let nextPokemon = 0;
    if (scrollRef.current) {

      pokedex.map((pok, i) => pok.name === pokemon.name ? nextPokemon = i : "")
      setSelectPokemonUrl(pokedex[nextPokemon - 1].url)
      getPokemonData()

      scrollRef.current.scrollBy({
        top: -24,
        behavior: 'smooth'
      });

    }
  }


  function getTypeStyle(type: string) {
    switch (type?.toLowerCase()) {
      case "normal":
        return "bg-gray-400";
      case "fire":
        return "bg-red-500";
      case "water":
        return "bg-blue-500";
      case "electric":
        return "bg-yellow-400";
      case "grass":
        return "bg-green-500";
      case "ice":
        return "bg-blue-200";
      case "fighting":
        return "bg-red-700";
      case "poison":
        return "bg-purple-500";
      case "ground":
        return "bg-yellow-700";
      case "flying":
        return "bg-blue-300";
      case "psychic":
        return "bg-pink-500";
      case "bug":
        return "bg-green-700";
      case "rock":
        return "bg-yellow-800";
      case "ghost":
        return "bg-purple-700";
      case "dragon":
        return "bg-indigo-700";
      case "dark":
        return "bg-gray-800";
      case "steel":
        return "bg-gray-500";
      case "fairy":
        return "bg-pink-300";
      default:
        return "";
    }
  }

  function getImagePokemon(pokemon: any) {
    switch (selectPokemonImage) {
      case 0:
        return pokemon?.front_default
      case 1:
        return pokemon?.back_default
    }
  }


  function searchPokemon(event: any) {

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20000`)
      .then((response) => response.json())
      .then((pokemon) => setPokedex(pokemon.results.filter((res: { name: string; }) => res.name.toLowerCase().includes(event.target.value.toLowerCase()))))
      .then(() => {

        if (pokedex.length === 0) {
          setPokemon({
            abilities:[],
            base_experience:0,
            cries: {},
            forms:[],
            game_indices: [],
            height: 0,
            held_items:[],
            id:0,
            is_default:false,
            location_area_encounters:"",
            moves:[],
            name: "",
            order:0,
            past_abilities:[],
            past_types:[],
            species: {},
            sprites: {},
            stats: [],
            types: [],
            weight: 0
           })
        } else {
          if (event.target.value.toLowerCase() == "") {
            setSelectPokemonUrl("https://pokeapi.co/api/v2/pokemon/1/")
          } else {
            setSelectPokemonUrl(pokedex[0].url)
          }

          getPokemonData()
        }


      })
  }

  return (
    <>
      <div className='bg-gradient-to-b from-red-700 via-red-600 to-red-500 w-1/2 h-1/2 md:w-[350px] md:h-[500px] border border-black rounded-md shadow-xl shadow-gray-500 z-50'>

        <div className='w-100 h-[75%] flex justify-center'>

          <div className='bg-gray-200  w-[90%] md:w-[270px] h-[270px]  border border-black rounded-xl flex justify-center items-center mt-10' >

            <div className='bg-white w-[220px] h-[240px] border border-black rounded-xl overflow-y-scroll scroll-container' ref={scrollRef}>

              <ul className='p-2'>
                {pokedex.map((pok) => {
                  return (
                    <li key={pok.name} className={pokemon.name === pok.name ? 'bg-blue-100' : ''}>
                      {pok.name}
                    </li>
                  );
                })}

              </ul>

            </div>

          </div>

        </div>

        <div className='w-100 h-1/4 flex items-center justify-around md:pb-10'>


          <input type='text' onChange={searchPokemon} className='bg-white h-[25px]  w-[75px] md:w-[150px] border border-black rounded-md p-2' placeholder='Search Pokemon...'></input>


          <div className="relative w-10 h-10 md:w-28 md:h-28">

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 md:w-8 h-12 bg-gray-800 cursor-pointer" onClick={DecreaseSelectPokemon} tabIndex={0}></div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 md:w-8 h-12 bg-gray-800 cursor-pointer" onClick={IncreaseSelectPokemon} tabIndex={0}></div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-5 md:h-8 bg-gray-800 cursor-pointer" onClick={(e) => { setSelectPokemonImage(0) }}></div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-5 md:h-8 bg-gray-800 cursor-pointer" onClick={(e) => { setSelectPokemonImage(1) }}></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-5 md:h-8 bg-gray-800 cursor-pointer"></div>

          </div>

        </div>

      </div>
      <div className='bg-gradient-to-b from-red-700 via-red-600 to-red-500 w-1/2 h-1/2 md:w-[350px] md:h-[500px] border border-black rounded-md shadow-xl shadow-gray-500 z-50'>

        <div className='w-100 h-1/2 flex justify-center'>

          <div className='bg-gray-200  w-[95%] md:w-[330px]  h-[220px] md:h-[270px]  border border-black rounded-xl flex justify-center items-center mt-10' >

            <div className='bg-white  w-[90%] md:w-[320px] h-[210px] md:h-[250px] border border-black rounded-xl overflow-y-scroll scroll-container'>
              <div className='fixed ml-2 mt-1 h-[20px] w-[20px]  text-sm font-bold'>{pokemon.order} </div>
              <img src={getImagePokemon(pokemon.sprites)} className='w-[100%] h-[85%]'></img>


              {pokemon.types ? pokemon.types.length > 1 ?
                <div className="flex  justify-around">
                  <div className={`${getTypeStyle(pokemon.types[0]?.type?.name)} p-1 w-[75px] md:w-[100px] rounded-xl text-center font-bold`}>{pokemon.types[0]?.type?.name}</div>
                  <div className={`${getTypeStyle(pokemon.types[1]?.type?.name)} p-1 w-[75px] md:w-[100px] rounded-xl text-center font-bold`} >{pokemon.types[1]?.type?.name}</div>
                </div>
                : <div className='flex justify-center'>
                  <div className={`${getTypeStyle(pokemon.types[0]?.type?.name)} p-1 w-[75px] md:w-[100px] rounded-xl text-center font-bold`} >{pokemon.types[0]?.type?.name}</div>
                </div> : ''
              }

            </div>

          </div>

        </div>

        <div className='w-100 h-1/2 flex items-center justify-around'>

          <div className='bg-gray-200  w-[95%] md:w-[330px] h-[120px] md:h-[170px]  border border-black rounded-xl flex justify-center items-center mt-12' >

            <div className='bg-white  w-[90%] md:w-[320px] h-[100px] md:h-[160px] border border-black rounded-xl overflow-y-scroll scroll-container'>
              <div className='grid  grid-cols-6 md:grid-cols-12 gap-1 p-1'>
                {pokemon.stats ? pokemon.stats.map((res) => (
                  <div className='col-span-6'><span className='font-bold text-sm'>{res.stat.name} :</span> {res.base_stat}</div>
                )) : ''}
                <div className='col-span-6 md:col-span-12 h-[1px] bg-black'></div>
                {pokemon.abilities ?
                  <>
                    <div className='col-span-6'>
                      <div><span className='font-bold text-sm'>Ability:</span></div>
                      <div>{pokemon.abilities[0]?.ability.name}</div></div>

                    {pokemon.abilities[1] ? <div className='col-span-6'>
                      <div><span className='font-bold text-sm'>Hidden Ability:</span></div>
                      <div>{pokemon.abilities[1]?.ability.name}</div></div> : ''}
                  </>
                  : ""}



              </div>


            </div>

          </div>

        </div>




      </div>
    </>
  )

}

export default Pokedex
