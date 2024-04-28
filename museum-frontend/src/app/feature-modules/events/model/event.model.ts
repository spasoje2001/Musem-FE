import { Organizer } from "../../stakeholder/model/organizer.model";
import { RoomReservation } from "./room-reservation.model";

export interface Event {
    id: number;
    name: string;
    description: string;
    startDateTime: string;
    durationMinutes: number;
    ticketsNumber: number;
    price: number;
    organizer: Organizer;
    createdDateTime: string;
    roomReservation: RoomReservation
    status: string
}
