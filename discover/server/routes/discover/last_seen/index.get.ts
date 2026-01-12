import { lastSeenDealsList } from '../../../mockData/horizontalRow.mock';
/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return lastSeenDealsList;
});
