import { User } from "src/app/infrastructure/auth/model/user.model";

export interface Tour {
  id: number;
  name: string;
  description: string;
  duration: string;
  occurrenceDateTime: Date;
  adultTicketPrice: string;
  minorTicketPrice: string;
  guide: User; // Proveriti da li moze ovako da ostane ili ce morati bas kustos da bude
  capacity: string;
}