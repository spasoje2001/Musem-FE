import { Item } from "../../items/model/item.model";

// Exhibition model in the frontend
export interface Exhibition {
    id: number;
    name: string;
    averageRating: number;
    picture: string;
    shortDescription: string;
    longDescription: string;
    theme: ExhibitionTheme;
    status: string;
    proposal: ExhibitionProposal;
    curator: Curator;
    itemReservations: ItemReservation[];
  }

  export interface ExhibitionProposal {
    id: number;
    startDate: string;
    endDate: string;
    organizer: Organizer;
    roomReservation: RoomReservation;
    priceList: ExhibitionPriceList;
}

export interface CreateExhibition {
  name: string;
  theme: ExhibitionTheme;
  shortDescription: string;
  longDescription: string;
  picture: string;
  itemIds: number[];
  proposalId: number;
  curatorId: number;
}

export enum ExhibitionTheme {
  ANCIENT_HISTORY = 'ANCIENT_HISTORY',
  MEDIEVAL_HISTORY = 'MEDIEVAL_HISTORY',
  MODERN_HISTORY = 'MODERN_HISTORY',
  FINE_ARTS = 'FINE_ARTS',
  CONTEMPORARY_ART = 'CONTEMPORARY_ART',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  SCULPTURE = 'SCULPTURE',
  SCIENCE_AND_TECHNOLOGY = 'SCIENCE_AND_TECHNOLOGY',
  NATURAL_HISTORY = 'NATURAL_HISTORY',
  MARITIME = 'MARITIME',
  AVIATION = 'AVIATION',
  SPACE_EXPLORATION = 'SPACE_EXPLORATION',
  WORLD_CULTURES = 'WORLD_CULTURES',
  INDIGENOUS_CULTURES = 'INDIGENOUS_CULTURES',
  MUSIC_HISTORY = 'MUSIC_HISTORY',
  LITERARY_ARTS = 'LITERARY_ARTS',
  FASHION_AND_DESIGN = 'FASHION_AND_DESIGN',
  FILM_AND_MEDIA = 'FILM_AND_MEDIA',
  ARCHAEOLOGY = 'ARCHAEOLOGY',
  MILITARY_HISTORY = 'MILITARY_HISTORY',
  ENVIRONMENTAL_SCIENCE = 'ENVIRONMENTAL_SCIENCE',
  CHILDREN_EDUCATION = 'CHILDREN_EDUCATION',
  SEASONAL = 'SEASONAL'
}

  
  // Organizer model in the frontend
  export interface Organizer {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    biography: string;
  }
  
  // Curator model in the frontend
  export interface Curator {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    biography: string;
  }

  export interface ItemReservation {
    id: number;
    startDate: string;
    endDate: string;
    item: Item;
}
  
  // RoomReservation model in the frontend
  export interface RoomReservation {
    id: number;
    startDate: string;
    endDate: string;
    room: Room;
  }
  
  // Room model in the frontend
  export interface Room {
    id: number;
    name: string;
    number: number;
  }

  export interface ExhibitionPriceList {
    adultPrice: number;
    minorPrice: number;
}

export interface ExhibitionProposalRequest {
  startDate: string;
  endDate: string;
  organizerId: number;
  roomId: number;
  adultPrice: number;
  minorPrice: number;
}