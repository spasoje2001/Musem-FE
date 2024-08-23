import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Room } from './model/exhibition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly apiUrl = environment.apiHost + 'rooms'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  getAvailableRooms(startDate: string, endDate: string): Observable<Room[]> {
    const params = { startDate, endDate };
    return this.http.get<Room[]>(`${this.apiUrl}/available`, { params });
  }
}
