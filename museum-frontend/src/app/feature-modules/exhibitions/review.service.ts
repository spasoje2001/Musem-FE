import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { CreateReview, Review } from './model/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly apiUrl = environment.apiHost + 'reviews';

  constructor(private http: HttpClient) { }

  getReviewsByExhibitionId(exhibitionId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/exhibition/${exhibitionId}`);
  }

  addReview(newReview: CreateReview): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, newReview);
  }
}