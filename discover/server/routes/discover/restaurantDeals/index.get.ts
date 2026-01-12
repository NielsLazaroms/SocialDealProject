import { dealsListRestaurant } from '../../../mockData/deals/restaurants/restaurantDeals.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return dealsListRestaurant;
});
