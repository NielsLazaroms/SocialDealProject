import * as icon from './icons/index';
export const dealIcons = {
  rating: icon.Star,
  car: icon.Car,
  walking: icon.FigureWalking,
  shoppingCart: icon.ShoppingCart,
  informationCircle: icon.Information,
  heartFilled: icon.HeartFilled,
  heartOutlined: icon.HeartOutlined,
  mapMarker: icon.MapMarker,
  arrowRight: icon.ArrowRight,
};

export const categoryIcons = {
  alle_deals: icon.Star,
  curssussen_workshops: icon.Curssussen_Workshops,
  eten_drinken: icon.Eten_Drinken,
  overnachten: icon.Overnachten,
  speciaalzaken_autos: icon.Speciaalzaken_Autos,
  sport: icon.Sport,
  uitjes: icon.Uitjes,
  wellness_beauty: icon.Wellness_Beauty,
  ontbijt: icon.Ontbijt,
  lunch: icon.Lunch,
  diner: icon.Diner,
  borrel: icon.Borrel,
  highTea: icon.HighTea,
  camping: icon.Camping,
  hotel: icon.Hotel,
  bungalow: icon.Bungalow,
  appartement: icon.Appartement,
  roundTrip: icon.RoundTrip,
};

export const mapIcons = {
  expand: icon.Expand,
  collapse: icon.Collapse,
  increase: icon.Increase,
  decrease: icon.Decrease,
  closeOverlay: icon.CloseOverlay,
  openOverlay: icon.OpenOverlay,
  chevronLeft: icon.ChevronLeft,
  chevronRight: icon.ChevronRight,
};
export const searchbarIcons = {
  close: icon.Close,
};
export const dropDownIcons = {
  arrowDown: icon.ArrowDown,
  starFilled: icon.StarFilled,
};

export type CategoryIconName = keyof typeof categoryIcons;
export type DealIconName = keyof typeof dealIcons;
export type MapIconName = keyof typeof mapIcons;
export type SearchBarIconName = keyof typeof searchbarIcons;
export type DropDownIconName = keyof typeof dropDownIcons;
