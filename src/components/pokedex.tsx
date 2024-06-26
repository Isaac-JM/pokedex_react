import { useState, useEffect, useRef } from 'react';
import { listPokemon } from '../interfaces/listPokemon';
import { Pokemon } from '../interfaces/pokemon';
import CrossPiece from './cross_piece';
import ScreenPokemonList from './screen_pokemon_list';
import ScreenPokemonImage from './screen_pokemon_image';
import ScreenPokemonStats from './screen_pokemon_stats';

const Pokedex: React.FC= () => {

    const [pokedex, setPokedex] = useState<listPokemon[]>([]);

    const [pokemon, setPokemon] = useState<Pokemon>(
        {
            abilities: [],
            base_experience: 0,
            cries: {},
            forms: [],
            game_indices: [],
            height: 0,
            held_items: [],
            id: 0,
            is_default: false,
            location_area_encounters: "",
            moves: [],
            name: "",
            order: 0,
            past_abilities: [],
            past_types: [],
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

    const searchPokemon=(event: any)=> {

        fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20000`)
            .then((response) => response.json())
            .then((pokemon) => setPokedex(pokemon.results.filter((res: { name: string; }) => res.name.toLowerCase().includes(event.target.value.toLowerCase()))))
            .then(() => {

                if (pokedex.length === 0) {
                    setPokemon({
                        abilities: [],
                        base_experience: 0,
                        cries: {},
                        forms: [],
                        game_indices: [],
                        height: 0,
                        held_items: [],
                        id: 0,
                        is_default: false,
                        location_area_encounters: "",
                        moves: [],
                        name: "",
                        order: 0,
                        past_abilities: [],
                        past_types: [],
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

    const selectImagePokemonEvent = (number: number) => {
        setSelectPokemonImage(number)
    }

    return (
        <>
            <div className='bg-gradient-to-b from-red-700 via-red-600 to-red-500 w-1/2 h-1/2 md:w-[350px] md:h-[500px] border border-black rounded-md shadow-xl shadow-gray-500 z-50'>

                <div className='w-100 h-[75%] flex justify-center'>

                    <ScreenPokemonList
                        pokedex={pokedex}
                        pokemon={pokemon}
                        scrollRef={scrollRef}>
                    </ScreenPokemonList>

                </div>

                <div className='w-100 h-1/4 flex items-center justify-around md:pb-10'>

                    <input type='text' onChange={searchPokemon} className='bg-white h-[25px]  w-[75px] md:w-[150px] border border-black rounded-md p-2' placeholder='Search Pokemon...'></input>

                    <CrossPiece
                        SetSelectPokemonImageEvent={selectImagePokemonEvent}
                        IncreaseSelectPokemonEvent={IncreaseSelectPokemon}
                        DecreaseSelectPokemonEvent={DecreaseSelectPokemon}>
                    </CrossPiece>

                </div>

            </div>
            <div className='bg-gradient-to-b from-red-700 via-red-600 to-red-500 w-1/2 h-1/2 md:w-[350px] md:h-[500px] border border-black rounded-md shadow-xl shadow-gray-500 z-50'>

                <div className='w-100 h-1/2 flex justify-center'>

                    <ScreenPokemonImage
                        pokemon={pokemon}
                        selectPokemonImage={selectPokemonImage}
                    >
                    </ScreenPokemonImage>
                </div>

                <div className='w-100 h-1/2 flex items-center justify-around'>

                    <ScreenPokemonStats
                        pokemon={pokemon}>
                    </ScreenPokemonStats>

                </div>




            </div>
        </>
    )

}

export default Pokedex
