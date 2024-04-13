import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AuthenticationResponse } from 'src/app/infrastructure/auth/model/authentication-response.model';
import { environment } from 'src/env/environment';
import { Administrator } from '../model/administrator.model';
import { AdministratorEditProfile } from '../model/administrator-edit-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  basePath = environment.apiHost + 'users/administrators'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAdministratorById(id: number): Observable<Administrator> {
    const path = this.basePath + '/' + id;
    return this.http.get<Administrator>(path);
  }

  getLoggedInAdministrator(): Observable<Administrator> {
    const path = this.basePath + '/profile';
    return this.http.get<Administrator>(path);
  }

  updateProfile(updated: AdministratorEditProfile): Observable<AuthenticationResponse> {
    const path = this.basePath;
    return this.http.put<AuthenticationResponse>(path, updated)
    .pipe(
      tap(((authenticationResponse) => {
        this.authService.setToken(authenticationResponse);
      }))
    );
  }

}
