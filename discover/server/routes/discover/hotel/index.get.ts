import { resolveHotelByTime } from '~~/layers/discover/server/utils/formatActiveHotel';
import { hotelInformationList } from '~~/layers/discover/server/mockData/hotel.mock';
/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  const key = resolveHotelByTime();
  return hotelInformationList[key];
});
