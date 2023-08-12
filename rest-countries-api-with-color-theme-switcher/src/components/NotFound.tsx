import { useContext } from 'react'
import { ThemeContext } from '../context/Context'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`not__found--style ${theme}__theme`}>
            <h2>404</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to='/' className={`${theme}__theme`}>Back to home</Link>
        </div>
    )
}

export default NotFound