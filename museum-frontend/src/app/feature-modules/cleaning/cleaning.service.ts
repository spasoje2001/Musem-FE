import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cleaning } from './model/cleaning.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { Item } from '../items/model/item.model';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  constructor(private http: HttpClient,private router: Router) { }

  declineCleaning(itemId : number, curatorId : number): Observable<Cleaning> {
    return this.http.put<Cleaning>(environment.apiHost + 'cleaning/decline/' + itemId + '/' + curatorId, null);
  }

  acceptCleaning(itemId : number, curatorId : number): Observable<Cleaning> {
    return this.http.put<Cleaning>(environment.apiHost + 'cleaning/approve/' + itemId + '/' + curatorId, null);
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
}
