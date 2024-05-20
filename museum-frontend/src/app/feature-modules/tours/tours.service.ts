import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/env/environment";
import { Tour } from "./model/tour.model";
import { Curator } from "../stakeholder/model/curator.model";
import { PersonalTourRequest } from "./model/personalTourRequest.model";
import { PersonalTour } from "./model/personalTour.model";
import { Guest } from "../stakeholder/model/guest.model";
import { TourPricelist } from "./model/tourPricelist.model";
import {Organizer} from "../stakeholder/model/organizer.model";

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(environment.apiHost + 'tours', tour);
  }

  getTours(): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tours');
  }

  deleteTour(id: number): Observable<Tour> {
    return this.http.delete<Tour>(environment.apiHost + 'tours/' + id);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(environment.apiHost + 'tours', tour);
  }

  getCurators(): Observable<Curator>{
    return this.http.get<Curator>(environment.apiHost + 'users/curators');
  }

  getCuratorById(curatorId: number): Observable<Curator>{
    return this.http.get<Curator>(environment.apiHost + 'users/curators/' + curatorId);
  }

  getOrganizersTours(organizerId: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tours/organizers/' + organizerId);
  }

  getOrganizerById(organizerId: number): Observable<Organizer>{
    return this.http.get<Organizer>(environment.apiHost + 'users/organizers/' + organizerId);
  }

  addTourRequest(request: PersonalTourRequest): Observable<PersonalTourRequest> {
    return this.http.post<PersonalTourRequest>(environment.apiHost + 'personalTourRequests', request);
  }

  updateTourRequest(request: PersonalTourRequest): Observable<PersonalTourRequest> {
    return this.http.put<PersonalTourRequest>(environment.apiHost + 'personalTourRequests', request);
  }

  getGuestById(guestId: number): Observable<Guest>{
    return this.http.get<Guest>(environment.apiHost + 'users/guests/' + guestId);
  }

  getGuestsTourRequests(guestId: number): Observable<PersonalTourRequest> {
    return this.http.get<PersonalTourRequest>(environment.apiHost + 'personalTourRequests/' + guestId);
  }

  getTourRequests(): Observable<PersonalTourRequest> {
    return this.http.get<PersonalTourRequest>(environment.apiHost + 'personalTourRequests');
  }

  getTourRequestsOnHold(): Observable<PersonalTourRequest> {
    return this.http.get<PersonalTourRequest>(environment.apiHost + 'personalTourRequests/onHold');
  }

  addPersonalTour(tour: PersonalTour): Observable<PersonalTour> {
    return this.http.post<PersonalTour>(environment.apiHost + 'personalTours', tour);
  }

  getTourPricelist(): Observable<TourPricelist> {
    return this.http.get<TourPricelist>(environment.apiHost + 'tourPricelists');
  }

  updateTourPricelist(pricelist: TourPricelist): Observable<TourPricelist> {
    return this.http.put<TourPricelist>(environment.apiHost + 'tourPricelists', pricelist);
  }

}