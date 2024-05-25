import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cleaning } from './model/cleaning.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { Item } from '../items/model/item.model';
import { CleaningReport } from './model/cleaningReport.model';
import {CleaningDeclineModel} from "./model/cleaning-decline.model";


@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  constructor(private http: HttpClient,private router: Router) { }

  declineCleaning(cleaning: CleaningDeclineModel): Observable<Cleaning> {
    return this.http.put<Cleaning>(environment.apiHost + 'cleaning/decline', cleaning);
  }

  acceptCleaning(cleaningId : number, curatorId : number): Observable<Cleaning> {
    return this.http.put<Cleaning>(environment.apiHost + 'cleaning/approve/' + cleaningId + '/' + curatorId, null);
  }

  getNewCleanings(): Observable<Cleaning>{
    return this.http.get<Cleaning>(environment.apiHost + 'cleaning/new');
  }

  addCleaning(itemId : number, cleaning:Cleaning): Observable<Cleaning> {
    return this.http.post<Cleaning>(environment.apiHost + 'cleaning/' + itemId, cleaning);
  }

  getItemsForCleaningHandling() : Observable<Item>{
    return this.http.get<Item>(environment.apiHost + 'items/forCleaning');
  }

  putItemToCleaning(cleaningId : number): Observable<Cleaning> {
    return this.http.put<Cleaning>(environment.apiHost + 'cleaning/putToCleaning/' + cleaningId, null);
  }

  finishCleaning(cleaningId : number): Observable<Cleaning> {
    return this.http.put<Cleaning>(environment.apiHost + 'cleaning/finishCleaning/' + cleaningId, null);
  }

  writeReport(cleaningReport : CleaningReport) : Observable<CleaningReport> {
      return this.http.post<CleaningReport>(environment.apiHost + 'cleaningReport', cleaningReport);
  }

  seeGeneratedResport(userId: number) : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfCleaning/generate-pdf/' + userId, { responseType: 'blob' });
  }

  saveGeneratedResport(userId: number) : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfCleaning/save-pdf/' + userId, { responseType: 'blob' });
  }

  seeGeneratedPersonalReport(userId: number) : Observable<Blob> {
    return this.http.get(environment.apiHost + 'pdfCleaning/generate-pdf-personal/' + userId, { responseType: 'blob' });
  }
  
}
