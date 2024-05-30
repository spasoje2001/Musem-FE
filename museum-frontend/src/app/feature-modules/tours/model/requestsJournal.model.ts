import {PersonalTourRequest, PersonalTourRequestStatus} from "./personalTourRequest.model";
import {Guest} from "../../stakeholder/model/guest.model";
import {Organizer} from "../../stakeholder/model/organizer.model";

export interface RequestsJournalModel{
  id: number;
  operation: string;
  guestNumber: string;
  occurrenceDateTime: Date;
  dat: Date;
  personalTourRequestId: number;
  personalTourRequest?: PersonalTourRequest;
  proposerId: number;
  proposer?: Guest;
  organizerId?: number;
  organizer?: Organizer;
  status: PersonalTourRequestStatus;
  denialReason?: string;
  proposerContactPhone: string;
  vers: number;
}
