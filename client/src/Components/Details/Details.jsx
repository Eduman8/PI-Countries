import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, getCountries } from '../../Actions/Index'
import styles from './styles.modules.css'
import Loading from '../Assets/Loading.gif'
import { Link } from 'react-router-dom'
import { BsHouseFill } from 'react-icons/bs'


function Details() {
    let { id } = useParams();
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const loading = useSelector(state => state.loading)
    const allActivities = useSelector(state => state.allActivities)


    const HandleDispatch = () => {
        dispatch(getCountries())
    }

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])


    return (
        <div className='background'>
            <div className='card'>
                <div className='links'>
                    <Link className="ul-nav-home" to='/countries' onClick={() => HandleDispatch()}><BsHouseFill />Home</Link>
                </div>
                {loading ? <img src={Loading} alt='img-loading' /> : details !== null ?
                    <div>
                        <div className={styles.flag}>
                            <h2>{details.name}</h2>
                            <img src={details.image} alt={details.name} className={styles.imagen} />
                        </div>
                        <div className='details'>
                            <div  >
                                <h3>Details:</h3>
                                <p>Code: {details.id}</p>
                                <p>Continent: {details.continent}</p>
                                <p>Capital: {details.capital}</p>
                                <p>Population: {details.population}</p>
                                <p>Area: {details.area}Km</p>
                                <p>Subregion: {details.subregion}</p>
                            </div>
                            <div >
                                <h3>Activities:</h3>
                                {allActivities?.length > 0 ? allActivities?.map(e => {
                                    if (e.countries.includes(details.id)) {
                                        return (
                                            <div key={e.id}>
                                                <p>Name: {e.name}</p>
                                                <p>Difficulty: {e.difficulty}</p>
                                                <p>Duration: {e.duration}</p>
                                                <p>Season: {e.season}</p>
                                            </div>
                                            
                                        )
                                    }
                                })
                                    : <p>Without activities</p>}
                            </div>
                        </div>
                    </div> : <p>Country not found</p>
                }
            </div>
        </div>
    )
}

export default Details