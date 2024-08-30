import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { NotificationResponse } from './model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = `${environment.apiHost}notifications`;

  constructor(private http: HttpClient, private router: Router) { }

  getNotificationsByUserId(userId: number): Observable<NotificationResponse[]> {
    return this.http.get<NotificationResponse[]>(`${this.baseUrl}/user/${userId}`);
  }

  notifyExhibitionUpdate(exhibitionId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/exhibition-update/${exhibitionId}`, {}); //Provereno
  }

  notifyNewExhibition(exhibitionId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/new-exhibition/${exhibitionId}`, {}); //Provereno
  }

  sendReminderForExhibition(exhibitionId: number): Observable<void> {                 //Provereno
    return this.http.post<void>(`${this.baseUrl}/exhibition-reminder/${exhibitionId}`, {});
  }

  notifyPurchaseConfirmation(ticketId: number): Observable<void> {                    //Provereno
    return this.http.post<void>(`${this.baseUrl}/purchase-confirmation/${ticketId}`, {});
  }

  notifyNewReview(reviewId: number): Observable<void> {                               //Provereno   
    return this.http.post<void>(`${this.baseUrl}/new-review/${reviewId}`, {});
  }

  notifyPromotion(exhibitionId: number): Observable<void> {                           //reseno - ovo zapravo i ne moze jer se ne menja za sad cena karata kada je kreirana izlozba.
    return this.http.post<void>(`${this.baseUrl}/promotion/${exhibitionId}`, {});
  }

  notifyExhibitionClosingSoon(exhibitionId: number): Observable<void> {               //Provereno           
    return this.http.post<void>(`${this.baseUrl}/exhibition-closing-soon/${exhibitionId}`, {});
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/read/${notificationId}`, {});
  }
  


}
