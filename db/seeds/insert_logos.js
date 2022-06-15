
const tableName = 'logos'
exports.seed = async function (knex) {
  await knex(tableName).del()
  await knex(tableName).insert([
    { key: 'aribnb_square', name: 'AirBNB', url: '/logos/airbnb.png', validateUrl: 'https://www.airbnb.com' },
    { key: 'vrbo_square', name: 'VRBO', url: '/logos/vrbo.png', validateUrl: 'https://www.vrbo.com' },
    { key: 'expedia_square', name: 'Expedia', url: '/logos/expedia.png', validateUrl: 'https://www.expedia.com' },
    
    // { key: 'airbnb_horizontal', name: 'AirBNB', url: '/logos/airbnb-horizontal.png', validateUrl: /https:\/\/airbnb\.com\// },
    // { key: 'aribnb_square', name: 'AirBNB', url: '/logos/airbnb-square.png', validateUrl: /https:\/\/airbnb\.com\// },
    // { key: 'booking_horizontal', name: 'Booking.com', url: '/logos/booking-horizontal.png', validateUrl: /https:\/\/booking\.com\// },
    // { key: 'booking_square', name: 'Booking.com', url: '/logos/booking-square.png', validateUrl: /https:\/\/booking\.com\// },
    // { key: 'expedia_horizontal', name: 'Expedia', url: '/logos/expedia-horizontal.png', validateUrl: /https:\/\/expedia\.com\// },
    // { key: 'expedia_square', name: 'Expedia', url: '/logos/expedia-square.png', validateUrl: /https:\/\/expedia\.com\// },
    // { key: 'vrbo_horizontal', name: 'VRBO', url: '/logos/vrbo-horizontal.png', validateUrl: /https:\/\/vrbo\.com\// },
    // { key: 'vrbo_square', name: 'VRBO', url: '/logos/vrbo-square.png', validateUrl: /https:\/\/vrbo\.com\// },
  ]);
};
