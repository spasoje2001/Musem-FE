// Exhibition model in the frontend
export interface Exhibition {
    id: number;
    name: string;
    picture: string;
    shortDescription: string;
    longDescription: string;
    theme: string;
    status: string;
    startDate: string;
    endDate: string;
    price: number;
    organizer: Organizer;
    curator: Curator;
    roomReservation: RoomReservation;
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
  
  // RoomReservation model in the frontend
  export interface RoomReservation {
    id: number;
    startDateTime: string;
    endDateTime: string;
    durationMinutes: number;
    room: Room;
  }
  
  // Room model in the frontend
  export interface Room {
    id: number;
    name: string;
    floor: number;
    number: number;
    // Add other properties as needed
  }

  export interface ExhibitionProposal {
    startDate: string;    // Expected to be a string in "dd.MM.yyyy." format
    endDate: string;      // Expected to be a string in "dd.MM.yyyy." format
    price: number;        // Expected to be a positive number or zero
    roomId: number;       // Expected to be the ID of the selected room
    organizerId: number;  // Expected to be the ID of the organizer creating the proposal
    curatorId: number;    // Expected to be the ID of the selected curator
}