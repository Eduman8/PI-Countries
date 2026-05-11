import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters, getDetail, getCountries } from '../../Actions/Index'
import './styles.modules.css'
import Loading from '../Assets/Loading.gif'
import { Link } from 'react-router-dom'
import { BsHouseFill } from 'react-icons/bs'

function Details() {
    let { id } = useParams();
    const dispatch = useDispatch()
    const details = useSelector(state => state.detail)
    const loading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)
    const activities = details?.activities || []

    const HandleDispatch = () => {
        dispatch(clearFilters())
        dispatch(getCountries())
    }

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <main className='details-page'>
            <section className='details-card'>
                <div className='details-actions'>
                    <Link className="details-home-link" to='/countries' onClick={() => HandleDispatch()}><BsHouseFill /> Home</Link>
                </div>
                {loading ? <div className='details-loading'><img src={Loading} alt='Loading country details' /><span>Loading details...</span></div> : details !== null ?
                    <div>
                        <div className='details-hero'>
                            <div>
                                <p className='details-kicker'>{details.continent}</p>
                                <h1>{details.name}</h1>
                                <p className='details-code'>Country code: {details.id}</p>
                            </div>
                            <img src={details.image} alt={`${details.name} flag`} className='details-flag' />
                        </div>
                        <div className='details-grid'>
                            <div className='details-panel'>
                                <h2>Country details</h2>
                                <dl className='stats-list'>
                                    <div><dt>Capital</dt><dd>{details.capital}</dd></div>
                                    <div><dt>Population</dt><dd>{details.population}</dd></div>
                                    <div><dt>Area</dt><dd>{details.area} km²</dd></div>
                                    <div><dt>Subregion</dt><dd>{details.subregion || 'Not available'}</dd></div>
                                </dl>
                            </div>
                            <div className='details-panel'>
                                <h2>Activities</h2>
                                {activities.length > 0 ? <div className='activity-list'>{activities.map(e => {
                                    return (
                                        <article className='activity-item' key={e.id}>
                                            <h3>{e.name}</h3>
                                            <p>Difficulty: {e.difficulty}</p>
                                            <p>Duration: {e.duration} h</p>
                                            <p>Season: {e.season}</p>
                                        </article>
                                    )
                                })}</div>
                                    : <p className='empty-copy'>No activities registered yet.</p>}
                            </div>
                        </div>
                    </div> : <p className='empty-copy'>{error || 'Country not found'}</p>
                }
            </section>
        </main>
    )
}

export default Details
