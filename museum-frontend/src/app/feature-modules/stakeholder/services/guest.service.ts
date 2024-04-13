import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Guest } from '../model/guest.model';
import { environment } from 'src/env/environment';
import { GuestEditProfile } from '../model/guest-edit-profile.mode';
import { AuthenticationResponse } from 'src/app/infrastructure/auth/model/authentication-response.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  basePath = environment.apiHost + 'users/guests'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getGuestById(id: number): Observable<Guest> {
    const path = this.basePath + '/' + id;
    return this.http.get<Guest>(path);
  }

  getLoggedInGuest(): Observable<Guest> {
    const path = this.basePath + '/profile';
    return this.http.get<Guest>(path);
  }

  updateProfile(updated: GuestEditProfile): Observable<AuthenticationResponse> {
    const path = this.basePath;
    return this.http.put<AuthenticationResponse>(path, updated)
    .pipe(
      tap(((authenticationResponse) => {
        this.authService.setToken(authenticationResponse);
      }))
    );
  }

}
