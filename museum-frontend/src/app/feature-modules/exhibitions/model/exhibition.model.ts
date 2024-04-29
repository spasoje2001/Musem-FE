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
    roomReservations: RoomReservation[];
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