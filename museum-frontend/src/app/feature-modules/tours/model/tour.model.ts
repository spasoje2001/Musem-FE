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
  category: TourCategory;
}

export enum TourCategory {
  ArtCollections = 0,
  HistoricalExhibits = 1,
  ScienceAndTechnology = 2,
  CulturalHeritage = 3,
  AncientArt = 4,
  EuropeanPaintings = 5,
  ModernArt = 6,
  AmericanArt = 7,
  AsianArt = 8,
  AfricanCulture = 9,
  IslamicArt = 10,
  CostumeInstitute = 11,
  ArmsAndArmor = 12
}
