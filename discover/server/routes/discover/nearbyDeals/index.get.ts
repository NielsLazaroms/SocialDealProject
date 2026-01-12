import { dealsList } from '../../../mockData/deals/nearby/nearbyDeals.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  // TODO remove duplicate
  return [...dealsList, ...dealsList];
});
