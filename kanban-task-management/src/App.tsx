import Header from './components/Header'
import Columns from './components/Columns'
import Drawer from './components/Drawer'
import { useAppSelector } from './app/hooks'
import { selectBoardList } from './features/board/dataSlice'
import EmptyBoard from './components/EmptyBoard'
import { globalThemeContext } from './context/ThemeContext'

const App: React.FC = () => {
  const selector = useAppSelector(selectBoardList)
  const { theme } = globalThemeContext()

  return (
    <>
      {selector.length === 0 ?
        <EmptyBoard />
        :
        <div className='min-h-screen flex flex-col'>
          <Header />
          <div className={`overflow-auto min-h-full flex flex-1 relative ${theme === 'dark' ? 'bg-very-dark-bg' : 'bg-light-bg'}`}>
            <Drawer />
            <Columns />
          </div>
        </div>
      }
    </>
  )
}

export default App
