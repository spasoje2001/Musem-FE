import { Room } from "./room.model";

export interface RoomReservation {
    id: number;
    startDateTime: string;
    durationMinutes: number;
    room: Room
}
