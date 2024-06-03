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

  getAvailableRooms(startDate: string, endDate: string): Observable<Room[]> {
    const formattedStartDate = this.reformatDateString(startDate);
    const formattedEndDate = this.reformatDateString(endDate);
    const path = `${this.basePath}/availableDates`;
    const params = new HttpParams()
      .set('startDate', formattedStartDate)
      .set('endDate', formattedEndDate);
    return this.http.get<Room[]>(path, { params });
  }

  private reformatDateString(dateStr: string): string {
    // Assuming dateStr is in the format "yyyy-MM-dd"
    // Convert it to "dd.MM.yyyy."
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}.`;
  }


}
