import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../Actions/Index'
import styles from './styles.modules.css'
import Loading from '../Assets/Loading.gif'

function Details(props) {

    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const activities = details.activities?.map(e => {
        return {
            name: e.name,
            difficulty: e.difficulty,
            duration: e.duration,
            season: e.season
        }
    })


    return (
        <div>
            <div className='card'>
                {loading ? <img src={Loading} /> : details !== null ?
                    <div>
                        <div className={styles.flag}>
                            <h2>{details.name}</h2>
                            <img src={details.image} alt={details.name} className={styles.imagen} />
                        </div>
                        <div className={styles.cont}>
                            <div className={styles.detail}>
                                <div className={styles.details}>
                                    <h3>Details:</h3>
                                    <p>Code: {details.id}</p>
                                    <p>Continent: {details.continent}</p>
                                    <p>Capital: {details.capital}</p>
                                    <p>Population: {details.population}</p>
                                    <p>Subregion: {details.subregion}</p>
                                </div>
                                <div className={styles.activities}>
                                    <h3>Activities:</h3>
                                    {activities?.length > 0 ? activities?.map(e => {
                                        return (
                                            <div key={e.id}>
                                                <p>Name: {e.name}</p>
                                                <p>Difficulty: {e.difficulty}</p>
                                                <p>Duration: {e.duration}</p>
                                                <p>Season: {e.season}</p>

                                            </div>
                                        )
                                    })
                                        : <p>Without activities</p>}
                                </div>
                            </div>
                        </div>
                    </div> : <p>Country not found</p>
                }
            </div>
        </div>
    )
}

export default Details