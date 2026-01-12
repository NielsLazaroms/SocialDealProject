export type HorizontalRowDealDTO = {
  id: number;
  categoryId: number;
  business: string;
  location: string;
  title: string;
  ratingNumber?: number;
  ratingAmount?: number;
  duration: number;
  amountSold: number;
  favourite: boolean;
  priceAmount: number;
  priceColor: string;
  priceSize: string;
  oldPriceAmount: number;
  oldPriceStrikethrough: boolean;
  oldPriceColor: string;
  touristTaxText?: string;
  touristTaxColor?: string;
  image: string;
  discount: number;
  tag?: string;
  tagColor?: string;
};

export const lastSeenDealsList: HorizontalRowDealDTO[] = [
  {
    id: 1,
    categoryId: 3,
    business: 'Wellness Resort',
    location: 'Eindhoven',
    title: 'Saunadag voor 2',
    ratingNumber: 9.2,
    ratingAmount: 124,
    duration: 0,
    amountSold: 1234,
    favourite: false,
    priceAmount: 39,
    priceColor: 'green',
    priceSize: 'big',
    oldPriceAmount: 59,
    oldPriceStrikethrough: true,
    oldPriceColor: 'gray',
    image: 'https://images.socialdeal.nl/deal/kei-scherp-eindhoven-24072509394254.jpg',
    discount: 0.7,
    tag: 'New today',
    tagColor: '#FF8800',
  },
  {
    id: 2,
    categoryId: 2,
    business: 'Bowlingcentrum',
    location: 'Tilburg',
    title: 'Bowlen + bittergarnituur',
    ratingNumber: 8.4,
    ratingAmount: 89,
    duration: 2,
    amountSold: 842,
    favourite: false,
    priceAmount: 25.95,
    priceColor: 'green',
    priceSize: 'big',
    oldPriceAmount: 40,
    oldPriceStrikethrough: true,
    oldPriceColor: 'gray',
    image: 'https://images.socialdeal.nl/deal/check-25090514382298.jpg',
    discount: 0.45,
  },

  {
    id: 3,
    categoryId: 1,
    business: 'Sushi Restaurant',
    location: 'Utrecht',
    title: 'All you can eat sushi',
    ratingNumber: 9.6,
    ratingAmount: 321,
    duration: 3,
    amountSold: 2319,
    favourite: true,
    priceAmount: 30,
    priceColor: 'green',
    priceSize: 'big',
    oldPriceAmount: 45,
    oldPriceStrikethrough: true,
    oldPriceColor: 'gray',
    image: 'https://media.socialdeal.nl/deal/de-vooruitgang-25032612311680.jpg',
    discount: 0.32,
    tag: 'New today',
  },
  {
    id: 4,
    categoryId: 1,
    business: 'Sushi Restaurant',
    location: 'Utrecht',
    title: 'All you can eat sushi',
    ratingNumber: 9.6,
    ratingAmount: 321,
    duration: 3,
    amountSold: 2319,
    favourite: true,
    priceAmount: 30,
    priceColor: 'green',
    priceSize: 'big',
    oldPriceAmount: 45,
    oldPriceStrikethrough: true,
    oldPriceColor: 'gray',
    image: 'https://media.socialdeal.nl/deal/de-vooruitgang-25032612311680.jpg',
    discount: 0.32,
    tag: 'New today',
  },
  {
    id: 5,
    categoryId: 1,
    business: 'Sushi Restaurant',
    location: 'Utrecht',
    title: 'All you can eat sushi',
    ratingNumber: 9.6,
    ratingAmount: 321,
    duration: 3,
    amountSold: 2319,
    favourite: true,
    priceAmount: 30,
    priceColor: 'green',
    priceSize: 'big',
    oldPriceAmount: 45,
    oldPriceStrikethrough: true,
    oldPriceColor: 'gray',
    image: 'https://media.socialdeal.nl/deal/de-vooruitgang-25032612311680.jpg',
    discount: 0.32,
    tag: 'New today',
  },
];
