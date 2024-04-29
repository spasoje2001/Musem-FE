import { Exhibition } from "../../exhibitions/model/exhibition.model";
import { Curator } from "../../stakeholder/model/curator.model";

export interface Tour {
  id?: number;
  name: string;
  description: string;
  duration?: string;
  occurrenceDateTime: Date;
  adultTicketPrice: string;
  minorTicketPrice: string;
  guide?: Curator; 
  guideId?: number;
  capacity: string;
  picturePath: string;
  exhibitions?: Exhibition[];
}