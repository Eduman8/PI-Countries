import { Link } from "react-router-dom";
import { translateContinent } from '../../utils/translations'
import './styles.modules.css'

export default function Card({ image, name, continent, id }) {
    const shouldClampName = name.length > 34

    return (
        <Link to={`/countries/${id}`} className="country-card-link" aria-label={`Ver detalle de ${name}`}>
            <article className="country-card">
                <div className="country-card__flag-wrap">
                    <img className="country-card__flag" src={image} alt={`Bandera de ${name}`} />
                </div>
                <div className="country-card__body">
                    <p className="country-card__eyebrow">{translateContinent(continent)}</p>
                    <h2 className={`country-card__title${shouldClampName ? ' country-card__title--clamp' : ''}`}>{name}</h2>
                    <span className="country-card__cta">Ver detalle</span>
                </div>
            </article>
        </Link>
    )
}
