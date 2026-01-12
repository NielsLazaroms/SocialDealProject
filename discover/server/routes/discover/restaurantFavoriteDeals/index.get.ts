import { favoriteDealsList } from '../../../mockData/deals/restaurants/favoriteDeals.mock';
/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return favoriteDealsList;
});
