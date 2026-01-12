import { InspirationInformationBlockList } from '~~/layers/discover/server/mockData/inspiration.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return Object.values(InspirationInformationBlockList)[0];
});
