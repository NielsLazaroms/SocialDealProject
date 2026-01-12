import type { restaurantInformationList } from '../mockData/restaurant.mock';
import { getLocalHour } from '../../utils/getLocalHour';

export function resolveCourseByTime(): keyof typeof restaurantInformationList {
  const hour = getLocalHour();
  if (hour < 11) return 'ontbijt';
  if (hour < 14) return 'lunch';
  if (hour < 16) return 'hightea';
  if (hour < 20) return 'borrel';
  return 'diner';
}
