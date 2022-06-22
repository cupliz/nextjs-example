
const tableName = 'listings'
exports.seed = async function (knex) {
  await knex(tableName).del()
  await knex(tableName).insert([
    {
      name: 'Brianna Nolan Items',
      desc: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
      user: 'uSbULOoVEBMCPDFkf3WverxxONP2',
      background: 'background/fCGKW3qOPy3TLkgBojkyOWOso039.jpg',
      title: 'Choose your platform:',
      links: JSON.stringify([
        { logo: 'aribnb_square', url: 'https://www.airbnb.com/rooms/51228159' },
        { logo: 'vrbo_square', url: 'https://www.vrbo.com/2459328' },
      ]),
      theme: 'dark',
      ga: 'G-TSCF7JD851',
      fb: ''
    }
  ]);
};
