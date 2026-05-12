const axios = require('axios');
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');

const PORT = process.env.PORT || 3001;
const COUNTRIES_API_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca3,flags,continents,capital,subregion,area,population';

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

  const response = await axios.get(COUNTRIES_API_URL);

  const countries = response.data.map((country) => ({
    id: country.cca3,
    name: country.name?.common || 'Not found',
    image: getFlagUrl(country.flags),
    continent: country.continents?.[0] || 'Not found',
    capital: country.capital?.[0] || 'Not found',
    subregion: country.subregion || 'Not found',
    area: country.area || 0,
    population: country.population || 0,
  }));

  await Country.bulkCreate(countries);
  console.log(`Countries seed completed: ${countries.length} countries loaded.`);
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