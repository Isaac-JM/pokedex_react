import { Pokemon } from '../interfaces/pokemon';

interface ScreenPokemonStatsProps {
    pokemon:Pokemon;
}

const ScreenPokemonStats: React.FC<ScreenPokemonStatsProps> = ({ pokemon}) => {

    return (

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

    )

}

export default ScreenPokemonStats
