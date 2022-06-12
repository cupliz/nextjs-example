
const tableName = 'listings'
exports.seed = async function (knex) {
  await knex(tableName).del()
  await knex(tableName).insert([
    {
      customer: 1,
      name: 'John Listings',
      background: 'https://a0.muscache.com/im/pictures/miso/Hosting-51228159/original/2d49f125-0e23-4e30-8792-3df2661c1cb5.jpeg',
      title: 'Choose your platform:',
      links: JSON.stringify([
        { logo: 'aribnb_square', url: 'https://www.airbnb.com/rooms/51228159' },
        { logo: 'vrbo_square', url: 'https://www.vrbo.com/2459328' },
      ]),
      theme: 'dark',
    }
  ]);
};
