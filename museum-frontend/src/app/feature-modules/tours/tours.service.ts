import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/env/environment";
import { Tour } from "./model/tour.model";
import { Curator } from "../stakeholder/model/curator.model";

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
}