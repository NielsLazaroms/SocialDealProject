import { hotelCategoryList } from '~~/layers/discover/server/mockData/categories.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return hotelCategoryList;
});
