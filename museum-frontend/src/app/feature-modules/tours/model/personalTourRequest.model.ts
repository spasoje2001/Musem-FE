import { Curator } from "../../stakeholder/model/curator.model";
import { Guest } from "../../stakeholder/model/guest.model";
import { Organizer } from "../../stakeholder/model/organizer.model";

export interface PersonalTourRequest {
  id?: number;
  duration?: string;
  occurrenceDateTime: Date;
  guideId?: number;
  guide?: Curator;
  proposerId?: number;
  proposer?: Guest;
  organizerId?: number;
  organizer?: Organizer;
  guestNumber: string;
  status: PersonalTourRequestStatus;
}

export enum PersonalTourRequestStatus {
  ON_HOLD = 0,
  ACCEPTED = 1,
  DECLINED = 2,
  CANCELED = 3,
  EXPIRED = 4,
  PROPOSED_TERMS = 5
}
