const Amadeus = require('amadeus');

let amadeus = null;

if (process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET) {
  amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
  });
} else {
  console.warn('Amadeus API keys missing. Flight search will not work.');
}

/**
 * Search live flight offers
 */
const searchFlights = async (origin, destination, departureDate, adults = 1) => {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: adults,
    });

    return response.data;
  } catch (error) {
    console.error('Amadeus API Error:', error.description);
    throw new Error('Could not fetch live flight data');
  }
};

module.exports = { searchFlights };
