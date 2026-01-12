import type { hotelInformationList } from '../mockData/hotel.mock';
import { getLocalHour } from '../../utils/getLocalHour';

export function resolveHotelByTime(): keyof typeof hotelInformationList {
  const hour = getLocalHour();
  if (hour < 11) return 'hotel';
  if (hour < 14) return 'camping';
  if (hour < 16) return 'bungalow';
  if (hour < 20) return 'appartement';
  return 'rondreis';
}
