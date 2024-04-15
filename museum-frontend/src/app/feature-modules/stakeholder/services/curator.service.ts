import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { AuthenticationResponse } from 'src/app/infrastructure/auth/model/authentication-response.model';
import { environment } from 'src/env/environment';
import { CuratorEditProfile } from '../model/curator-edit-profile.model';
import { Curator } from '../model/curator.model';

@Injectable({
  providedIn: 'root'
})
export class CuratorService {

  basePath = environment.apiHost + 'users/curators'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCuratorById(id: number): Observable<Curator> {
    const path = this.basePath + '/' + id;
    return this.http.get<Curator>(path);
  }

  getLoggedInCurator(): Observable<Curator> {
    const path = this.basePath + '/profile';
    return this.http.get<Curator>(path);
  }

  updateProfile(updated: CuratorEditProfile): Observable<AuthenticationResponse> {
    const path = this.basePath;
    return this.http.put<AuthenticationResponse>(path, updated)
    .pipe(
      tap(((authenticationResponse) => {
        this.authService.setToken(authenticationResponse);
      }))
    );
  }

}
