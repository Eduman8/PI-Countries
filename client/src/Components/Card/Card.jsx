import { Link } from "react-router-dom";
import styles from './styles.modules.css'

export default function Card({ image, name, continent, id }) {
    return (
        <Link to={`/countries/${id}`}>
            <div className={styles.card}>
                <h2 id={styles.title}>{name}</h2>
                <img className={styles.flag} src={image} alt='flag' />
                <h4 className={styles.text}>Continent: {continent}</h4>
            </div>
        </Link>
    )
}