const session = require('supertest-session');
const { Op } = require('sequelize');
const app = require('../../src/app.js');
const { Activity, Country, conn } = require('../../src/db.js');

const agent = session(app);

const countries = [
  {
    id: 'XAA',
    name: 'Test Argentina',
    image: 'https://flagcdn.com/ar.svg',
    continent: 'South America',
    capital: 'Buenos Aires',
    area: 2780400,
    population: 45376763,
  },
  {
    id: 'XBB',
    name: 'Test Brazil',
    image: 'https://flagcdn.com/br.svg',
    continent: 'South America',
    capital: 'Brasilia',
    area: 8515767,
    population: 212559417,
  },
];

describe('Country and activity routes', () => {
  before(() => conn.sync());

  beforeEach(async () => {
    await Activity.destroy({ where: { name: { [Op.in]: ['Test Hiking', 'Test Rafting', 'Test Ski'] } } });
    await Country.destroy({ where: { id: { [Op.in]: countries.map((country) => country.id) } } });
    await Country.bulkCreate(countries);
  });

  describe('GET /countries', () => {
    it('should get 200', () => agent.get('/countries').expect(200));
  });

  describe('POST /activities', () => {
    it('should create an activity associated to countries', () => agent
      .post('/activities')
      .send({
        name: 'Test Hiking',
        difficulty: 3,
        duration: 4,
        season: 'Summer',
        countries: ['XAA', 'XBB'],
      })
      .expect(201)
      .expect((res) => {
        if (!res.body.id) throw new Error('Expected activity id');
        if (res.body.countries.length !== 2) throw new Error('Expected associated country ids');
      }));
  });

  describe('GET /countries/:id', () => {
    it('should include associated activities', async () => {
      await agent
        .post('/activities')
        .send({
          name: 'Test Rafting',
          difficulty: 4,
          duration: 2,
          season: 'Summer',
          countries: ['XAA'],
        })
        .expect(201);

      return agent
        .get('/countries/XAA')
        .expect(200)
        .expect((res) => {
          if (!res.body.activities.length) throw new Error('Expected country activities');
        });
    });
  });

  describe('GET /activities', () => {
    it('should return existing activities', async () => {
      await agent
        .post('/activities')
        .send({
          name: 'Test Ski',
          difficulty: 5,
          duration: 6,
          season: 'Winter',
          countries: ['XAA'],
        })
        .expect(201);

      return agent
        .get('/activities')
        .expect(200)
        .expect((res) => {
          if (!res.body.length) throw new Error('Expected activities');
          if (!res.body[0].countryDetails.length) throw new Error('Expected associated countries');
        });
    });
  });
});
