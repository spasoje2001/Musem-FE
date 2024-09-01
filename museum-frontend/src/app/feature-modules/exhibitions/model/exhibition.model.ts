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
  ARCHAEOLOGY = 'ARCHAEOLOGY',
  AVIATION = 'AVIATION',
  CHILDREN_EDUCATION = 'CHILDREN_EDUCATION',
  CONTEMPORARY_ART = 'CONTEMPORARY_ART',
  ENVIRONMENTAL_SCIENCE = 'ENVIRONMENTAL_SCIENCE',
  FASHION_AND_DESIGN = 'FASHION_AND_DESIGN',
  FILM_AND_MEDIA = 'FILM_AND_MEDIA',
  FINE_ARTS = 'FINE_ARTS',
  INDIGENOUS_CULTURES = 'INDIGENOUS_CULTURES',
  LITERARY_ARTS = 'LITERARY_ARTS',
  MARITIME = 'MARITIME',
  MEDIEVAL_HISTORY = 'MEDIEVAL_HISTORY',
  MILITARY_HISTORY = 'MILITARY_HISTORY',
  MODERN_HISTORY = 'MODERN_HISTORY',
  MUSIC_HISTORY = 'MUSIC_HISTORY',
  NATURAL_HISTORY = 'NATURAL_HISTORY',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  SCULPTURE = 'SCULPTURE',
  SCIENCE_AND_TECHNOLOGY = 'SCIENCE_AND_TECHNOLOGY',
  SEASONAL = 'SEASONAL',
  SPACE_EXPLORATION = 'SPACE_EXPLORATION',
  WORLD_CULTURES = 'WORLD_CULTURES'
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

export interface ExhibitionSearchRequestDTO {
  name?: string;
  shortDescription?: string;
  longDescription?: string;
  theme?: ExhibitionTheme;
  status?: ExhibitionStatus;
  startDate?: string;
  endDate?: string;
  organizer?: string;
  curator?: string;
  itemName?: string;
  itemDescription?: string;
  itemAuthorsName?: string;
  itemPeriod?: string;
  itemCategory?: ItemCategory;
  minRating?: number;
  comment?: string;
  guest?: string;
}

export enum ExhibitionStatus {
  READY_TO_OPEN = 'READY_TO_OPEN',
  OPENED = 'OPENED',
  CLOSED = 'CLOSED'
}

export enum ItemCategory {
  PAINTING = 'PAINTING',
  DRAWING = 'DRAWING',
  SCULPTURE = 'SCULPTURE',
  PRINT = 'PRINT',
  PHOTOGRAPH = 'PHOTOGRAPH',
  ARTIFACT = 'ARTIFACT',
  CLOTHING = 'CLOTHING',
  SPECIMEN = 'SPECIMEN',
  FOSSIL = 'FOSSIL',
  ANIMAL = 'ANIMAL',
  MINERAL = 'MINERAL',
  POTTERY = 'POTTERY',
  JEWELRY = 'JEWELRY'
}