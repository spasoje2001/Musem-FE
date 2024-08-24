import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/env/environment';
import { ExhibitionProposal, ExhibitionProposalRequest } from './model/exhibition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private readonly apiUrl = environment.apiHost + 'proposals';

  constructor(private http: HttpClient,private router: Router) { }

  createProposal(proposal: ExhibitionProposalRequest): Observable<ExhibitionProposal> {
    return this.http.post<ExhibitionProposal>(this.apiUrl, proposal);
  }
  
}