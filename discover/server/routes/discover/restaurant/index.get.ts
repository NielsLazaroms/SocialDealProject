import { restaurantInformationList } from '~~/layers/discover/server/mockData/restaurant.mock';
import { resolveCourseByTime } from '~~/layers/discover/server/utils/formatActiveRestaurant';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  const key = resolveCourseByTime();
  return restaurantInformationList[key];
});
