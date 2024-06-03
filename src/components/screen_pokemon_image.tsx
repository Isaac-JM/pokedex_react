import { Pokemon } from '../interfaces/pokemon';

interface ScreenPokemonImageProps {
    pokemon:Pokemon;
    selectPokemonImage:any
}

const ScreenPokemonImage: React.FC<ScreenPokemonImageProps> = ({ pokemon,selectPokemonImage }) => {

    const getTypeStyle=(type: string)=> {
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

    const getImagePokemon=(pokemon: any)=> {
        switch (selectPokemonImage) {
            case 0:
                return pokemon?.front_default
            case 1:
                return pokemon?.back_default
        }
    }


    return (

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



    )

}

export default ScreenPokemonImage
