const axios = require('axios');
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');

const PORT = process.env.PORT || 3001;
const COUNTRIES_API_URL = process.env.COUNTRIES_API_URL || 'https://restcountries.com/v3.1/all';

function getFlagUrl(flags) {
  if (!flags) return 'Not found';
  if (typeof flags === 'string') return flags;
  return flags.svg || flags.png || 'Not found';
}

async function seedCountries() {
  const countriesCount = await Country.count();

  if (countriesCount > 0) {
    console.log(`Countries seed skipped: ${countriesCount} countries already loaded.`);
    return;
  }

  const apiCountriesResponse = await axios.get(COUNTRIES_API_URL);
  const apiCountries = apiCountriesResponse.data.map((country) => ({
    id: country.cca3,
    name: country.name.common,
    image: getFlagUrl(country.flags),
    continent: country.continents ? country.continents[0] : 'Not found',
    capital: country.capital ? country.capital[0] : 'Not found',
    subregion: country.subregion,
    area: country.area,
    population: country.population,
  }));

  await Country.bulkCreate(apiCountries);
  console.log(`Countries seed completed: ${apiCountries.length} countries loaded.`);
}

async function startServer() {
  try {
    await conn.authenticate();
    await conn.sync();
    await seedCountries();

    server.listen(PORT, () => {
      console.log(`API listening at ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start API server:', error);
    process.exit(1);
  }
}

startServer();
