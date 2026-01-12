type TransportationMode = 'walking' | 'car';

export function travelTimeFromWalkingMinutes(walkingMinutes?: number) {
  if (!walkingMinutes) return { transportMode: 'walking' as const, transportDuration: 0 };

  const transportMode: TransportationMode = walkingMinutes > 20 ? 'car' : 'walking';

  const transportDuration =
    transportMode === 'car' ? Math.round(walkingMinutes / 6) : Math.round(walkingMinutes);

  return { transportMode, transportDuration };
}
