const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();

function formatActivity(activity) {
    return {
        id: activity.id,
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season
    };
}

function formatCountry(country) {
    const data = country.toJSON ? country.toJSON() : country;

    return {
        id: data.id,
        name: data.name,
        image: data.image,
        continent: data.continent,
        capital: data.capital,
        subregion: data.subregion,
        area: data.area,
        population: data.population,
        activities: (data.activities || []).map(formatActivity)
    };
}

router.get('/', async (req, res, next) => {
    const { name } = req.query

    try {
        const allCountries = await Country.findAll({
            include: [{
                model: Activity,
                through: { attributes: [] },
            }]
        })

        if (name) {
            const normalizedName = name.toLowerCase();
            const byName = allCountries.filter(i => i.name.toLowerCase().includes(normalizedName))
            return res.json(byName.map(formatCountry))
        }

        res.json(allCountries.map(formatCountry))
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const country = await Country.findByPk(id.toUpperCase(), {
            include: [{
                model: Activity,
                through: { attributes: [] },
            }]
        })

        if (!country) {
            return res.status(404).json({ error: 'Country not found' })
        }

        return res.json(formatCountry(country))
    } catch (error) {
        next(error)
    }
});

module.exports = router;
