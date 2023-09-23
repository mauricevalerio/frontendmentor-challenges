import Header from './components/Header'
import Columns from './components/Columns'
import EditModalContextProvider from './context/EditModalContext'

const App: React.FC = () => {

  return (
    <>
      <EditModalContextProvider>
        <Header />
        <Columns />
      </EditModalContextProvider>
    </>
  )
}

export default App
