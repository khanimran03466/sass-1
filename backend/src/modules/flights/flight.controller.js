const amadeusService = require('../../services/amadeus.service');
const { calculateFlightFees } = require('../../utils/revenue');

const searchFlights = async (req, res) => {
  const { from, to, date, adults } = req.query;

  try {
    // 1. Fetch live flights from Amadeus
    const rawFlights = await amadeusService.searchFlights(from, to, date, adults);

    // 2. Add markup and platform fees to each flight
    const processedFlights = rawFlights.map(flight => {
      const basePrice = parseFloat(flight.price.total);
      const revenue = calculateFlightFees(basePrice);
      
      return {
        id: flight.id,
        airline: flight.validatingAirlineCodes[0],
        from: flight.itineraries[0].segments[0].departure.iataCode,
        to: flight.itineraries[0].segments[0].arrival.iataCode,
        departureTime: flight.itineraries[0].segments[0].departure.at,
        basePrice: basePrice,
        totalPrice: revenue.totalPrice,
        markup: revenue.markup,
        serviceFee: revenue.serviceFee,
        currency: flight.price.currency
      };
    });

    res.json(processedFlights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bookFlight = async (req, res) => {
  // Logic for creating booking and razorpay order
  res.json({ message: 'Booking logic implementation ready' });
};

module.exports = { searchFlights, bookFlight };
