import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/env/environment";
import { Tour } from "./model/tour.model";
import { Curator } from "../stakeholder/model/curator.model";
import { PersonalTourRequest } from "./model/personalTourRequest.model";

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
    return this.http.put<Tour>(environment.apiHost + 'tours/' + tour.id, tour);
  }

  getCurators(): Observable<Curator>{
    return this.http.get<Curator>(environment.apiHost + 'users/curators');
  }
  
  getOrganizersTours(organizerId: number): Observable<Tour> {
    return this.http.get<Tour>(environment.apiHost + 'tours/organizers/' + organizerId);
  }

  addTourRequest(request: PersonalTourRequest): Observable<PersonalTourRequest> {
    return this.http.post<PersonalTourRequest>(environment.apiHost + 'personalTourRequests', request);
  }

  updateTourRequest(request: PersonalTourRequest): Observable<PersonalTourRequest> {
    return this.http.put<PersonalTourRequest>(environment.apiHost + 'personalTourRequests', request);
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
}