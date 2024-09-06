import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Comment, CreateComment } from './model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = environment.apiHost + 'comments';

  constructor(private http: HttpClient) { }

  getCommentsByExhibitionId(exhibitionId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/exhibition/${exhibitionId}`);
  }

  addComment(newComment: CreateComment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, newComment);
  }
}
