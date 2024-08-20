import { Room } from "./room.model";

export interface Item {
    id?: number;
    name : string;
    description : string;
    authorsName : string;
    yearOfCreation : string;
    period : string;
    category : ItemCategory;
    picture :  string;
  }

export enum ItemCategory {
    Painting = 0,
    Drawing = 1,
    Sculpture = 2,
    Print = 3,
    Photograph = 4,
    Artifact = 5,
    Clothing = 6,
    Specimen = 7,
    Fossil = 8,
    Animal = 9,
    Mineral = 10,
    Pottery = 11,
    Jewelry = 12
}
