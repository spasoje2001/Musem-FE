import { Tour } from "./tour.model";
import { Guest } from "../../stakeholder/model/guest.model";

export interface TourReservation {
  id?: number;
  tour?: Tour;
  guest?: Guest;
  tourId?: number;
  guestId?: number;
  numberOfAdultTickets: string;
  numberOfMinorTickets: string;
  reservationDateTime?: Date;
  totalPrice?: string;
}
