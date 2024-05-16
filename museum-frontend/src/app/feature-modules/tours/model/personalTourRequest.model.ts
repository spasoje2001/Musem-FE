import { Curator } from "../../stakeholder/model/curator.model";
import { Guest } from "../../stakeholder/model/guest.model";
import { Organizer } from "../../stakeholder/model/organizer.model";
import { Exhibition } from "../../exhibitions/model/exhibition.model";

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
  denialReason?: string;
  proposerContactPhone?: string;
  exhibitions?: Exhibition[];
}

export enum PersonalTourRequestStatus {
  IN_PROGRESS = 0,
  ACCEPTED = 1,
  DECLINED = 2,
  // CANCELED = 3,
  // EXPIRED = 4,
  // PROPOSED_TERMS = 5
}
