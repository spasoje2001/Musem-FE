import { Injectable } from '@angular/core';
import { BookTickets, Ticket } from './model/ticket.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly apiUrl = environment.apiHost + 'tickets'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  bookTickets(bookTickets: BookTickets): Observable<Ticket> {
    console.log(bookTickets);
    return this.http.post<Ticket>(`${this.apiUrl}/book`, bookTickets);
  }

  getTicketsByUserId(guestId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/guest/${guestId}`);
  }

  hasUserPurchasedTicket(exhibitionId: number, guestId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exhibition/${exhibitionId}/guest/${guestId}/has-ticket`);
  }
}
