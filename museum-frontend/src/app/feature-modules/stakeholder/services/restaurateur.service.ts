import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AuthenticationResponse } from 'src/app/infrastructure/auth/model/authentication-response.model';
import { environment } from 'src/env/environment';
import { RestaurateurEditProfile } from '../model/restaurateur-edit-profile.model';
import { Restaurateur } from '../model/restaurateur.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurateurService {

  basePath = environment.apiHost + 'users/restaurateurs'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getRestaurateurById(id: number): Observable<Restaurateur> {
    const path = this.basePath + '/' + id;
    return this.http.get<Restaurateur>(path);
  }

  getLoggedInRestaurateur(): Observable<Restaurateur> {
    const path = this.basePath + '/profile';
    return this.http.get<Restaurateur>(path);
  }

  updateProfile(updated: RestaurateurEditProfile): Observable<AuthenticationResponse> {
    const path = this.basePath;
    return this.http.put<AuthenticationResponse>(path, updated)
    .pipe(
      tap(((authenticationResponse) => {
        this.authService.setToken(authenticationResponse);
      }))
    );
  }

}
