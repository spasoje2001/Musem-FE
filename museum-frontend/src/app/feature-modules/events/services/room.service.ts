import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Room } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  basePath = environment.apiHost + 'rooms'

  constructor(
    private http: HttpClient,
  ) { }

  getAvailableRoomsByTimespan(startDateTime: string, durationMinutes: number): Observable<Room[]> {
    const path = this.basePath + '/available';
    const httpParams = new HttpParams().set('startDateTime', startDateTime).set('durationMinutes', durationMinutes);
    return this.http.get<Room[]>(path, { params: httpParams });
  }
  
  getAvailableRoomsForUpdating(eventId: number, startDateTime: string, durationMinutes: number): Observable<Room[]> {
    const path = this.basePath + '/available-for-update/' + eventId;
    const httpParams = new HttpParams().set('startDateTime', startDateTime).set('durationMinutes', durationMinutes);
    return this.http.get<Room[]>(path, { params: httpParams });
  }

}
