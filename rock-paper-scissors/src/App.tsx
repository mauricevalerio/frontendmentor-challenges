import Header from './components/Header'
import Main from './components/Main'
import Results from './components/Results'
import Rules from './components/Rules'
import GameContextProvider from './context/GameContext'

const App: React.FC = () => {

  return (
    <GameContextProvider>
      <div className='component__flex--container mx-auto h-100 d-flex flex-column text-white'>
        <Header />
        <Main />
        <Results />
        <Rules />
      </div>
    </GameContextProvider>
  )
}

export default App
