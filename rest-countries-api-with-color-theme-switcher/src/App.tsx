import { useContext } from 'react'
import Home, { loader as HomeLoader } from './pages/Home'
import { loader as CountryDetailsLoader } from './components/CountryDetails'
import CountryDetails from './components/CountryDetails'
import Layout from './components/Layout'
import { ThemeContext } from './context/Context'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import NotFound from './components/NotFound'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} loader={HomeLoader} />
    <Route path=':name' element={<CountryDetails />} loader={({ params }) => CountryDetailsLoader(params.name!)} errorElement={<NotFound />} />
    <Route path='*' element={<NotFound />} />
  </Route>
))

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`body__${theme}`}>
      <RouterProvider router={router} />
    </div>
  )

}

export default App
