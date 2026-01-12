import { cityList } from '~~/layers/discover/server/mockData/cities.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return cityList;
});
