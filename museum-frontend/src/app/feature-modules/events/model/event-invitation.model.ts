import { Curator } from "../../stakeholder/model/curator.model";
import { Event } from "./event.model";

export interface EventInvitation {
    id: number;
    event: Event;
    curator: Curator;
    status: string;
    declinationExplanation: string;
    createdDateTime: string;
}
