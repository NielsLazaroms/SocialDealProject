import type { InformationBlockDTO } from '../../types/informationBlockType_DTO';

export const hotelInformationList: Record<string, InformationBlockDTO> = {
  hotel: {
    title: { text: 'Geniet van een zorgeloos verblijf', position: 'left' },
    leadingHeader: 'Hotel',
    textPosition: 'left',
    buttonText: 'Bekijk meer Hotelverblijven',
    description:
      'Laat de dagelijkse beslommeringen achter je en dompel jezelf onder in luxe en comfort. Of je nu kiest voor een romantisch weekendje weg of een zakelijke overnachting, onze geselecteerde hotels bieden de perfecte combinatie van gastvrijheid en ontspanning. Geniet van een heerlijk zacht bed, uitstekende faciliteiten en een persoonlijke service die jouw verblijf onvergetelijk maakt. Je verdient het!',
    images: [
      'https://images.socialdeal.nl/img/dp-dynamicbanner-mobile-sd-awards-hotel.jpg',
      'https://images.socialdeal.nl/img/dp-img3-hotel-cozykamer.jpg',
    ],
  },
  camping: {
    title: { text: 'Ultieme vrijheid in de natuur', position: 'left' },
    leadingHeader: 'Camping',
    textPosition: 'left',
    buttonText: 'Bekijk meer Campings',
    description:
      'Ontsnap aan de dagelijkse hectiek en geniet van de frisse buitenlucht! Of je nu met een tent, caravan of camper komt, op de camping ervaar je de echte vrijheid. Word wakker met het gefluit van vogels, geniet van gezellige avonden onder de sterrenhemel en ontdek de prachtige omgeving direct vanaf je standplaats. De ideale plek voor jong en oud!',
    images: [
      'https://media.socialdeal.nl/img/camping-3.jpg',
      'https://media.socialdeal.nl/img/camping-1.jpg',
    ],
  },
  bungalow: {
    title: { text: 'Jouw eigen plekje in het groen', position: 'left' },
    leadingHeader: 'Bungalow',
    textPosition: 'left',
    buttonText: 'Bekijk meer Bungalows',
    description:
      'Geniet van het comfort van thuis, maar dan in een prachtige vakantieomgeving. Onze bungalows bieden alle ruimte en privacy die je nodig hebt voor een ontspannen verblijf met familie of vrienden. Met een eigen keuken, sfeervolle woonkamer en terras midden in de natuur, is dit de perfecte uitvalsbasis voor lange wandelingen of een dagje pure ontspanning.',
    images: [
      'https://images.socialdeal.nl/img/dp-header-desktop-bungalowspecials3.jpg',
      'https://media.socialdeal.nl/img/header-d-bungalowspecials.jpg',
    ],
  },
  appartement: {
    title: { text: 'Comfortabel verblijven in de stad', position: 'left' },
    leadingHeader: 'Appartement',
    textPosition: 'left',
    buttonText: 'Bekijk meer Appartementen',
    description:
      'Ervaar de stad als een local vanuit een stijlvol en volledig ingericht appartement. Geniet van de vrijheid om je eigen dag in te delen: ontbijt op je eigen balkon, verken de leukste wijken in de buurt en kom tot rust in een moderne omgeving. Ideaal voor wie op zoek is naar een combinatie van luxe, ruimte en een centrale locatie.',
    images: [
      'https://media.socialdeal.nl/img/dynamicbanner-m-hotels-bungalowspecials.jpg',
      'https://media.socialdeal.nl/img/header-d-bungalowspecials.jpg',
    ],
  },
  rondreis: {
    title: { text: 'Ontdek de wereld stap voor stap', position: 'left' },
    leadingHeader: 'Rondreis',
    textPosition: 'left',
    buttonText: 'Bekijk meer rondreizen',
    description:
      'Ga op avontuur en ontdek de meest indrukwekkende plekken tijdens een onvergetelijke rondreis! Laat je verrassen door de diversiteit aan landschappen, cultuur en lokale tradities. Wij hebben de mooiste routes al voor je uitgestippeld, zodat jij alleen nog maar hoeft te genieten van de nieuwe indrukken en unieke ervaringen die elke dag weer op je pad komen.',
    images: [
      'https://images.socialdeal.nl/travel/vakanties-banner-parijs-1.jpg',
      'https://media.socialdeal.nl/img/cities/berlijn_background.jpg',
    ],
  },
};
