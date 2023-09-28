import Header from './components/Header'
import Columns from './components/Columns'
import EditModalContextProvider from './context/EditModalContext'
import ThemeContextProvider from './context/ThemeContext'

const App: React.FC = () => {

  return (
    <>
      <ThemeContextProvider>
        <EditModalContextProvider>
          <Header />
          <Columns />
        </EditModalContextProvider>
      </ThemeContextProvider>
    </>
  )
}

export default App
