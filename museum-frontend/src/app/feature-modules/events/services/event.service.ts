import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Event } from '../model/event.model';
import { NewEvent } from '../model/new-event.model';
import { UpdatedEvent } from '../model/updated-event.model';
import { EventInvitation } from '../model/event-invitation.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  basePath = environment.apiHost + 'events';
  invitationsBasePath = this.basePath + '/invitations';

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
  
  getEventById(id: string): Observable<Event> {
    const path = this.basePath + '/' + id;
    return this.http.get<Event>(path);
  }
  
  updateEvent(updatedEvent: UpdatedEvent): Observable<any> {
    const path = this.basePath;
    return this.http.put<any>(path, updatedEvent);
  }
  
  inviteParticipant(eventId: number, curatorId: number): Observable<any> {
    const path = this.invitationsBasePath + '/invite/' + eventId + '/' + curatorId;
    return this.http.post<any>(path, {});
  }
  
  getPendingInvitations(): Observable<EventInvitation[]> {
    const path = this.invitationsBasePath + '/pending';
    return this.http.get<any>(path);
  }
  
  getRespondedInvitations(): Observable<EventInvitation[]> {
    const path = this.invitationsBasePath + '/responded';
    return this.http.get<any>(path);
  }

}
