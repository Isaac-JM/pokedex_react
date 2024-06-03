import { listPokemon } from '../interfaces/listPokemon';
import { Pokemon } from '../interfaces/pokemon';

interface ScreenPokemonListProps {
    pokedex: listPokemon[];
    pokemon:Pokemon;
    scrollRef:any
}

const ScreenPokemonList: React.FC<ScreenPokemonListProps> = ({ pokedex,pokemon,scrollRef }) => {

    return (
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


    )

}

export default ScreenPokemonList
