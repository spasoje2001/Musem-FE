import { Curator } from "../../stakeholder/model/curator.model";
import { Restaurateur } from "../../stakeholder/model/restaurateur.model";

export interface CleaningJournal {
    id?: number;
    text : string;
    startDate : string;
    endDate : string;
    restaurateur?: Restaurateur;
    curator?: Curator;
    status : CleaningStatus;
    itemId?: number;
    denialReason?: string;
    version?: number;
    finishCleaningTime?: string;
    putToCleaningTime?: string;
    operationType?: string;
}

export enum CleaningStatus{
    NEW = 0,
    APPROVED = 1,
    REJECTED = 2,
    INCLEANING = 3,
    CLEANSED = 4,
}