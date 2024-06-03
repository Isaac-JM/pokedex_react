
interface CrossPieceProps {
  DecreaseSelectPokemonEvent: (datos: string) => void;
  IncreaseSelectPokemonEvent: (datos: string) => void;
  SetSelectPokemonImageEvent: (datos: number) => void;
}


const CrossPiece: React.FC<CrossPieceProps> = ({ DecreaseSelectPokemonEvent,IncreaseSelectPokemonEvent,SetSelectPokemonImageEvent }) => {


  const DecreaseSelectPokemon=()=>{
    DecreaseSelectPokemonEvent("")
  }

  const IncreaseSelectPokemon=()=>{
    IncreaseSelectPokemonEvent("")
  }

  const setSelectPokemonImageFront=()=>{
    SetSelectPokemonImageEvent(0)
  }

  const setSelectPokemonImageBack=()=>{
    SetSelectPokemonImageEvent(1)
  }

  return (

    <div className="relative w-10 h-10 md:w-28 md:h-28">

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 md:w-8 h-12 bg-gray-800 cursor-pointer" onClick={DecreaseSelectPokemon} tabIndex={0}></div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 md:w-8 h-12 bg-gray-800 cursor-pointer" onClick={IncreaseSelectPokemon} tabIndex={0}></div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-5 md:h-8 bg-gray-800 cursor-pointer" onClick={setSelectPokemonImageFront}></div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-5 md:h-8 bg-gray-800 cursor-pointer" onClick={setSelectPokemonImageBack}></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-5 md:h-8 bg-gray-800 cursor-pointer"></div>

    </div>
  )

}

export default CrossPiece
