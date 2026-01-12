export type CategoryDTO = {
  id: number;
  key: string;
  label: string;
  color: string;
  icon: string;
};

export const categoryList: CategoryDTO[] = [
  {
    id: 0,
    key: 'alle_deals',
    label: 'Alle deals',
    color: '#0081E9',
    icon: 'alle_deals',
  },
  {
    id: 1,
    key: 'eten_drinken',
    label: 'Eten & drinken',
    color: '#339AED',
    icon: 'eten_drinken',
  },
  {
    id: 2,
    key: 'sport',
    label: 'Sport',
    color: '#2A3EBC',
    icon: 'sport',
  },
  {
    id: 3,
    key: 'wellness_beauty',
    label: 'Wellness & beauty',
    color: '#991A9D',
    icon: 'wellness_beauty',
  },
  {
    id: 4,
    key: 'overnachten',
    label: 'Overnachten',
    color: '#5621A3',
    icon: 'overnachten',
  },
  {
    id: 5,
    key: 'uitjes',
    label: 'Uitjes',
    color: '#55D4B4',
    icon: 'uitjes',
  },
  {
    id: 6,
    key: 'speciaalzaken_autos',
    label: 'Speciaalzaken & auto’s',
    color: '#F52C2D',
    icon: 'speciaalzaken_autos',
  },
  {
    id: 7,
    key: 'cursussen_workshops',
    label: 'Curssuen & Workshops',
    color: '#FF8800',
    icon: 'curssussen_workshops',
  },
];

export const restaurantCategoryList: CategoryDTO[] = [
  {
    id: 0,
    key: 'alle_deals',
    label: 'Alle deals',
    color: '#0081E9',
    icon: 'alle_deals',
  },
  {
    id: 8,
    key: 'ontbijt',
    label: 'Ontbijt',
    color: '#2AC9A1',
    icon: 'ontbijt',
  },
  {
    id: 9,
    key: 'lunch',
    label: 'Lunch',
    color: '#F52C2D',
    icon: 'lunch',
  },
  {
    id: 10,
    key: 'diner',
    label: 'Diner',
    color: '#40BF4B',
    icon: 'diner',
  },
  {
    id: 11,
    key: 'borrel',
    label: 'Borrel',
    color: '#FF8800',
    icon: 'borrel',
  },
  {
    id: 12,
    key: 'high_tea',
    label: 'High Tea',
    color: '#6C29CC',
    icon: 'highTea',
  },
];

export const hotelCategoryList: CategoryDTO[] = [
  {
    id: 0,
    key: 'alle_deals',
    label: 'Alle deals',
    color: '#0081E9',
    icon: 'alle_deals',
  },
  {
    id: 13,
    key: 'camping',
    label: 'Camping',
    color: '#FFC226',
    icon: 'camping',
  },
  {
    id: 14,
    key: 'hotel',
    label: 'Hotel',
    color: '#40BF4B',
    icon: 'hotel',
  },
  {
    id: 15,
    key: 'appartement',
    label: 'Appartement',
    color: '#FF8800',
    icon: 'appartement',
  },
  {
    id: 16,
    key: 'bungalow',
    label: 'Bungalow',
    color: '#F52C2D',
    icon: 'bungalow',
  },
  {
    id: 17,
    key: 'rondreizen',
    label: 'Rondreizen',
    color: '#BF20C4',
    icon: 'roundTrip',
  },
];
