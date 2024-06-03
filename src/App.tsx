import Pokedex from './components/pokedex';

function App() {

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center  p-1">
      <img src="/src/assets/fondo.avif" className='h-[100vh] w-[100vw] absolute'></img>
      <div className='fixed top-1 z-50'>
        <img src="/src/assets/pokedex_logo.png" className=' h-[100px]'></img>
      </div>
      <Pokedex></Pokedex>
    </div>
  
  )

}

export default App
