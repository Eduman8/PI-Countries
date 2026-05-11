const { Router } = require('express');
const { Activity, Country } = require('../db');
const router = Router();

const COUNTRY_ATTRIBUTES = ['id', 'name', 'image', 'continent'];
const VALID_SEASONS = {
    Summer: 'Summer',
    Verano: 'Summer',
    Autumn: 'Autumn',
    Otoño: 'Autumn',
    Otono: 'Autumn',
    Winter: 'Winter',
    Invierno: 'Winter',
    Spring: 'Spring',
    Primavera: 'Spring',
};

function formatActivity(activity) {
    const data = activity.toJSON ? activity.toJSON() : activity;
    const associatedCountries = data.countries || [];

    return {
        id: data.id,
        name: data.name,
        difficulty: data.difficulty,
        duration: data.duration,
        season: data.season,
        countries: associatedCountries.map((country) => country.id),
        countryDetails: associatedCountries.map((country) => ({
            id: country.id,
            name: country.name,
            image: country.image,
            continent: country.continent,
        })),
    };
}

function normalizeCountryIds(countries) {
    return countries.map((countryId) => String(countryId).trim().toUpperCase());
}

function normalizeSeason(season) {
    return VALID_SEASONS[season];
}

router.get('/', async function (req, res, next) {
    try {
        const activities = await Activity.findAll({
            include: [{
                model: Country,
                attributes: COUNTRY_ATTRIBUTES,
                through: { attributes: [] },
            }],
        });

        res.status(200).json(activities.map(formatActivity));
    } catch (e) {
        next(e);
    }
});

router.post('/', async function (req, res, next) {
    const { name, difficulty, duration, season, countries } = req.body;

    try {
        if (!Array.isArray(countries)) {
            return res.status(400).json({ error: 'countries must be an array of country ids' });
        }

        const countryIds = normalizeCountryIds(countries);

        if (!countryIds.length) {
            return res.status(400).json({ error: 'At least one country id is required' });
        }

        const uniqueCountryIds = [...new Set(countryIds)];
        const selectedCountries = await Country.findAll({
            where: { id: uniqueCountryIds },
            attributes: COUNTRY_ATTRIBUTES,
        });

        if (selectedCountries.length !== uniqueCountryIds.length) {
            const existingIds = selectedCountries.map((country) => country.id);
            const missingIds = uniqueCountryIds.filter((countryId) => !existingIds.includes(countryId));

            return res.status(400).json({
                error: `Countries not found: ${missingIds.join(', ')}`,
                missingCountries: missingIds,
            });
        }

        const normalizedSeason = normalizeSeason(season);

        if (!normalizedSeason) {
            return res.status(400).json({ error: 'season must be Summer, Autumn, Winter or Spring' });
        }

        const activity = await Activity.create({
            name,
            difficulty: String(difficulty),
            duration: String(duration),
            season: normalizedSeason,
        });

        await activity.addCountries(selectedCountries);

        const createdActivity = await Activity.findByPk(activity.id, {
            include: [{
                model: Country,
                attributes: COUNTRY_ATTRIBUTES,
                through: { attributes: [] },
            }],
        });

        return res.status(201).json(formatActivity(createdActivity));
    } catch (e) {
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: e.errors.map((error) => error.message) });
        }

        next(e);
    }
});

module.exports = router;
