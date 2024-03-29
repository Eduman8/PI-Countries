const { Router } = require('express');
const { Activity, Country } = require('../db');
const router = Router();



router.get('/', async function (req, res) {
    const activities = await Activity.findAll();
    res.status(200).send(activities)
});


router.post('/', async function (req, res) {
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        let actividad = await Activity.create({
            name,
            difficulty,
            duration,
            season,
            countries,
        }
        );
        let newActivity = {
            name,
            difficulty, 
            duration,
            season,
            countries
        }

        const paisActividad = await Country.findAll({
            where: { name: countries },
        });
        actividad.addCountries(paisActividad);
        console.log(paisActividad)
        res.status(200).send(newActivity);
    } catch (e) {
        console.log(e)
    }


});

module.exports = router;