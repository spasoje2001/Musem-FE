import { Curator } from "../../stakeholder/model/curator.model";

export interface Tour {
  id?: number;
  name: string;
  description: string;
  duration?: string;
  occurrenceDateTime: Date;
  adultTicketPrice: string;
  minorTicketPrice: string;
  guide?: Curator; // Proveriti da li moze ovako da ostane ili ce morati bas kustos da bude
  guideId?: number;
  capacity: string;
  picturePath: string;
}