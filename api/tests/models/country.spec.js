const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

const validCountry = {
  id: 'XAA',
  name: 'Test Argentina',
  image: 'https://flagcdn.com/ar.svg',
  continent: 'South America',
  capital: 'Buenos Aires',
  area: 2780400,
  population: 45376763,
};

describe('Country model', () => {
  before(() => conn.sync());

  afterEach(() => Country.destroy({ where: { id: validCountry.id } }));

  describe('Validators', () => {
    it('should throw an error if name is null', (done) => {
      Country.create({ ...validCountry, name: null })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });

    it('should throw an error if id is not a 3-letter country code', (done) => {
      Country.create({ ...validCountry, id: 'AR' })
        .then(() => done(new Error('It requires a valid country id')))
        .catch(() => done());
    });

    it('should work when its a valid country', async () => {
      const country = await Country.create(validCountry);
      expect(country.name).to.equal('Test Argentina');
    });
  });
});
