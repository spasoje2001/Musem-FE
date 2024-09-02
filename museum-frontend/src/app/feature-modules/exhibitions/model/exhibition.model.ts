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
  ANCIENT_HISTORY = 'Ancient History',
  ARCHAEOLOGY = 'Archaeology',
  AVIATION = 'Aviation',
  CHILDREN_EDUCATION = 'Children Education',
  CONTEMPORARY_ART = 'Contemporary Art',
  ENVIRONMENTAL_SCIENCE = 'Environmental Science',
  FASHION_AND_DESIGN = 'Fashion and Design',
  FILM_AND_MEDIA = 'Film and Media',
  FINE_ARTS = 'Fine Arts',
  INDIGENOUS_CULTURES = 'Indigenous Cultures',
  LITERARY_ARTS = 'Literary Arts',
  MARITIME = 'Maritime',
  MEDIEVAL_HISTORY = 'Medieval History',
  MILITARY_HISTORY = 'Military History',
  MODERN_HISTORY = 'Modern History',
  MUSIC_HISTORY = 'Music History',
  NATURAL_HISTORY = 'Natural History',
  PHOTOGRAPHY = 'Photography',
  SCULPTURE = 'Sculpture',
  SCIENCE_AND_TECHNOLOGY = 'Science and Technology',
  SEASONAL = 'Seasonal',
  SPACE_EXPLORATION = 'Space Exploration',
  WORLD_CULTURES = 'World Cultures'
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
  description?: string;
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
  READY_TO_OPEN = 'Ready to Open',
  OPENED = 'Opened',
  CLOSED = 'Closed'
}

export enum ItemCategory {
  PAINTING = 'Painting',
  DRAWING = 'Drawing',
  SCULPTURE = 'Sculpture',
  PRINT = 'Print',
  PHOTOGRAPH = 'Photograph',
  ARTIFACT = 'Artifact',
  CLOTHING = 'Clothing',
  SPECIMEN = 'Specimen',
  FOSSIL = 'Fossil',
  ANIMAL = 'Animal',
  MINERAL = 'Mineral',
  POTTERY = 'Pottery',
  JEWELRY = 'Jewelry'
}