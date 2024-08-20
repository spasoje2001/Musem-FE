import { Item } from "../../items/model/item.model";

// Exhibition model in the frontend
export interface Exhibition {
    id: number;
    name: string;
    picture: string;
    shortDescription: string;
    longDescription: string;
    theme: string;
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