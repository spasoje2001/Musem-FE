import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Event } from '../model/event.model';
import { NewEvent } from '../model/new-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  basePath = environment.apiHost + 'events'

  constructor(
    private http: HttpClient,
  ) { }

  getEventsByOrganizer(): Observable<Event[]> {
    const path = this.basePath + '/' + 'my';
    return this.http.get<Event[]>(path);
  }
  
  deleteEvent(event: Event): Observable<any> {
    const path = this.basePath + '/' + event.id;
    return this.http.delete<any>(path);
  }
  
  publishEvent(event: Event): Observable<any> {
    const path = this.basePath + '/' + event.id + '/publish';
    return this.http.patch<any>(path, {});
  }
  
  archiveEvent(event: Event): Observable<any> {
    const path = this.basePath + '/' + event.id + '/archive';
    return this.http.patch<any>(path, {});
  }
  
  saveEvent(newEvent: NewEvent): Observable<any> {
    const path = this.basePath;
    return this.http.post<any>(path, newEvent);
  }

}
