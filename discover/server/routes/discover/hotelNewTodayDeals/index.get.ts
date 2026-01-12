import { newTodayDealsList } from '../../../mockData/deals/hotels/newToday.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return newTodayDealsList;
});
