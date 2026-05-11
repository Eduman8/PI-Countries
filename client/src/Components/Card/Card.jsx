import { Link } from "react-router-dom";
import './styles.modules.css'

export default function Card({ image, name, continent, id }) {
    return (
        <Link to={`/countries/${id}`} className="country-card-link" aria-label={`View details for ${name}`}>
            <article className="country-card">
                <div className="country-card__flag-wrap">
                    <img className="country-card__flag" src={image} alt={`${name} flag`} />
                </div>
                <div className="country-card__body">
                    <p className="country-card__eyebrow">{continent}</p>
                    <h2 className="country-card__title">{name}</h2>
                    <span className="country-card__cta">View details</span>
                </div>
            </article>
        </Link>
    )
}
