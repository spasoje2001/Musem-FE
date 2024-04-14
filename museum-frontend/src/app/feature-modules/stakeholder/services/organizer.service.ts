import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AuthenticationResponse } from 'src/app/infrastructure/auth/model/authentication-response.model';
import { environment } from 'src/env/environment';
import { OrganizerEditProfile } from '../model/organizer-edit-profile.model';
import { Organizer } from '../model/organizer.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  basePath = environment.apiHost + 'users/organizers'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getOrganizerById(id: number): Observable<Organizer> {
    const path = this.basePath + '/' + id;
    return this.http.get<Organizer>(path);
  }

  getLoggedInOrganizer(): Observable<Organizer> {
    const path = this.basePath + '/profile';
    return this.http.get<Organizer>(path);
  }

  updateProfile(updated: OrganizerEditProfile): Observable<AuthenticationResponse> {
    const path = this.basePath;
    return this.http.put<AuthenticationResponse>(path, updated)
    .pipe(
      tap(((authenticationResponse) => {
        this.authService.setToken(authenticationResponse);
      }))
    );
  }

}
