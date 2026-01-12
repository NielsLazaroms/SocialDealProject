import type { SectionTitleProps } from '../components/SectionTitle/types';

export const titles = {
  HeaderSectionTitleNearby: {
    text: 'Vind de beste deals dichtbij',
    position: 'center',
    textShadow: 'shadow',
    color: '#ffffff',
    size: 'xl',
  },
  HeaderSectionTitleRestaurant: {
    text: 'Vind de beste restaurant deals',
    position: 'center',
    textShadow: 'shadow',
    color: '#ffffff',
    size: 'xl',
  },
  HeaderSectionTitleHotel: {
    text: 'Vind de beste hotel deals',
    position: 'center',
    textShadow: 'shadow',
    color: '#ffffff',
    size: 'xl',
  },

  HorizontalRowNewDealsTitle: {
    text: 'Nieuwe deals bij jou in de buurt',
    position: 'left',
    size: 'small',
  },
  LastSeenTitle: {
    text: 'Laatst bekeken',
    moreDealsTextButton: 'Bekijk alles',
    position: 'left',
    size: 'small',
  },
  CadeauTipsTitle: {
    text: 'Cadeau Tips',
    moreDealsTextButton: 'Bekijk alles',
    position: 'left',
    size: 'small',
  },

  FavoritesList: {
    text: 'Op je lijstje',
    moreDealsTextButton: 'Bekijk alles',
    position: 'left',
    size: 'small',
  },

  NearbyDealsTitle: {
    text: 'Deals in ',
    position: 'left',
    size: 'small',
  },

  MoreNearbyDealsTitle: {
    text: 'Meer deals in ',
    position: 'left',
    size: 'small',
  },

  CarouselTitle: {
    text: 'Populaire deals',
    position: 'center',
    showLines: true,
  },
  PopularDealsTitle: {
    text: 'Populaire deals',
    position: 'center',
    showLines: true,
  },
  InformationBreakfastTitle: {
    text: '🥐 Begin je dag goed',
    position: 'left',
  },
  InformationLunchTitle: {
    text: '😋 Lunch Trakteert: Ons Heerlijke 2-Gerechten Menu!',
    position: 'left',
  },
  InformationBorrelTitle: {
    text: '🍷 Tijd voor een borrel',
    position: 'left',
  },
  InformationHighTeaTitle: {
    text: '🫖 High Tea verwennerij',
    position: 'left',
  },
  InformationDinerTitle: {
    text: '🍽️ Zoek naar jou perfecte plek om te dineren',
    position: 'left',
  },
  CategorySectionTitle: {
    text: 'Doorzoek categorieën',
    position: 'center',
    showLines: true,
  },
  InformationInspirationHerfstTitle: {
    text: '🍂🍁 De Magie van de Herfst: Tijd voor Knusse Belevenissen ☕🍄',
    position: 'center',
    color: 'text-orange-400',
    showLines: true,
  },
  InformationInspirationCarnavalTitle: {
    text: '🎭🎉 Alaaf! Beleef de Gekste Dagen van het Jaar 🥳🍻',
    position: 'center',
    color: 'text-turqouise-400',
    showLines: true,
  },
  InformationInspirationCircusTitle: {
    text: '🎪🤹 Stap Binnen! De Magie van het Circus Wacht! 🦁✨',
    position: 'center',
    color: 'text-brand-400',
    showLines: true,
  },
  InformationHotelHotelverblijfTitle: {
    text: '🌟 Verwen jezelf met de perfecte Hotel Break!',
    position: 'left',
  },
} as const satisfies Record<string, SectionTitleProps>;
