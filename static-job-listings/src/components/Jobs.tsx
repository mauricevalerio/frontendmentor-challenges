import { useState } from 'react'
import jobs from '../data.json'
import IconRemove from '../assets/icon-remove.svg'

const Jobs: React.FC = () => {
    const [jobFilters, setJobFilters] = useState<string[]>([])

    const addFilter = (filter: string): void => {
        if (!jobFilters.includes(filter))
            setJobFilters(prevFilters => [...prevFilters, filter])
    }

    const removeFilter = (filterParam: string): void => {
        setJobFilters(prevFilters => prevFilters.filter(filter => filter !== filterParam))
    }

    const clearFilter = (): void => { setJobFilters([]) }

    const filterElements = jobFilters.map((jobFilter, index) =>
        <div key={index} className='filter-btn-container'>
            <button className='btn-text'>
                {jobFilter}
            </button>
            <button
                className='btn-remove'
                onClick={() => removeFilter(jobFilter)}>
                <img src={IconRemove} />
            </button>
        </div>
    )

    const jobElements = jobs?.map(job => {

        let jobTags: string[] = [job.role, job.level, ...job.languages, ...job.tools]

        // every returns true even if job filters array is empty
        let filteredJobs = (jobTags: string[], jobFilters: string[]): boolean => jobFilters.every(filter => jobTags.includes(filter))

        //return only job cards with the specified filters
        return filteredJobs(jobTags, jobFilters) &&

            <div key={job.id} className={`card ${job.new && job.featured ? 'special-card' : ''}`}>
                <div className='column-wrapper'>
                    <img src={job.logo} alt={`Logo for ${job.company}`} className='company-logo' />

                    <div>
                        <span className='company-name'>{job.company}</span>
                        {job.new && <span className='new-tag'>NEW!</span>}
                        {job.featured && <span className='featured-tag'>FEATURED</span>}

                        <p className='position'>{job.position}</p>

                        <span className='listing-gray-text'>{job.postedAt} &#8226;</span>
                        <span className='listing-gray-text'> {job.contract} &#8226;</span>
                        <span className='listing-gray-text'> {job.location}</span>
                    </div>
                </div>

                <div className='filters'>
                    {jobTags.map((filter, index) => <button
                        key={index}
                        className='filter-item'
                        onClick={() => addFilter(filter)}>
                        {filter}
                    </button>)}
                </div>
            </div>
    })

    return (
        <>
            <main className='job-listings'>
                <section>
                    {jobFilters.length > 0 &&
                        <div className='filters-list'>
                            <div className='filters-list-inner'>
                                {filterElements}
                            </div>
                            <button onClick={clearFilter} className='btn-clear'>Clear</button>
                        </div>}
                </section>
                {jobElements}
            </main>
        </>

    )
}

export default Jobs