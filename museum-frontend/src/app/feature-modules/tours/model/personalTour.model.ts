import { Curator } from "../../stakeholder/model/curator.model";
import { Guest } from "../../stakeholder/model/guest.model";
import { Organizer } from "../../stakeholder/model/organizer.model";

export interface PersonalTour {
  id?: number;
  duration?: string;
  occurrenceDateTime: Date;
  adultTicketPrice: string;
  minorTicketPrice: string;
  guideId?: number;
  guide?: Curator;
  proposerId?: number;
  proposer?: Guest;
  organizerId?: number;
  organizer?: Organizer;
  guestNumber: string;
}
