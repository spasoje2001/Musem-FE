export interface Ticket {
    id: number;
    numberOfAdults: number;
    numberOfMinors: number;
    totalPrice: number;
    exhibitionId: number;
    exhibitionName: string;
    exhibitionPicture: string;
    exhibitionRoomName: string;
    exhibitionRoomNumber: string;
    exhibitionStartDate: string; // ISO string format for dates
    exhibitionEndDate: string;
    guestId: number;
    guestFirstName: string;
    guestLastName: string;
  }

  export interface BookTickets {
    guestId: number;
    exhibitionId: number;
    numberOfAdults: number;
    numberOfMinors: number;
    totalPrice: number;
  }