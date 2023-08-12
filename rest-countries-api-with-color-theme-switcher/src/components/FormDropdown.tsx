import { useContext } from 'react'
import { ThemeContext } from '../context/Context'
import { FormDropDownProps } from '../interfaces/IFormProps'

const FormDropdown: React.FC<FormDropDownProps> = ({ filterRegion, filterRegionChange }) => {
    const { theme } = useContext(ThemeContext)
    const regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

    return (
        <div className={`form__dropdown--box ${theme}__theme`}>
            <select
                name='filterRegion'
                value={filterRegion}
                onChange={filterRegionChange}
                className='form__dropdown--select'>
                <option value=''>Filter by Region</option>
                {
                    regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                }
            </select>
        </div>
    )
}

export default FormDropdown