import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateExhibition, Exhibition, ExhibitionProposal } from './model/exhibition.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {
  
  constructor(private http: HttpClient,private router: Router) { }

  getExhibitions(): Observable<Exhibition> {
    return this.http.get<Exhibition>(environment.apiHost + 'exhibitions');
  }

  getExhibitionById(id: number): Observable<Exhibition> {
    return this.http.get<Exhibition>(environment.apiHost + `exhibitions/${id}`);
  }

  getExhibitionsByOrganizer(organizerId: number): Observable<Exhibition[]> {
    return this.http.get<Exhibition[]>(environment.apiHost + `exhibitions/organizer/${organizerId}`);
  }

  getExhibitionsByCurator(curatorId: number): Observable<Exhibition[]> {
    return this.http.get<Exhibition[]>(environment.apiHost + `exhibitions/curator/${curatorId}`);
  }

  seeOrganizerGeneratedReport() : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfExhibitions/generate-organizer-report', { responseType: 'blob' });
  }

  seeCuratorGeneratedReport() : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfExhibitions/generate-curator-report', { responseType: 'blob' });
  }

  createExhibition(createExhibition: CreateExhibition): Observable<Exhibition> {
    console.log(createExhibition);
    return this.http.post<Exhibition>(environment.apiHost + 'exhibitions', createExhibition);
  }
}
