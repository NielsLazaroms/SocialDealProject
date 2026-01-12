import { dealsListHotel } from '../../../mockData/deals/hotels/hotelDeals.mock';
/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return dealsListHotel;
});
