import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from 'src/env/environment';
import { AuthenticationResponse } from './model/authentication-response.model';
import { Login } from './model/login.model';
import { Registration } from './model/registration.model';
import { User } from './model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BooleanResponseDTO } from 'src/app/feature-modules/stakeholder/model/boolean-response.model';
import { EditEmployee } from './model/editEmployee.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$ = new BehaviorSubject<User>({ username: '', id: 0, role: '' });
  basePath = environment.apiHost + 'auth/';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(this.basePath + 'login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.token);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(this.basePath + 'register', registration)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.token);
          this.setUser();
        })
      );
  }

  registerEmployee(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(this.basePath + 'registerEmployee', registration);
  }

  getEmployeeById(id: number): Observable<EditEmployee> {
    console.log('get employee');
    console.log(id);
    return this.http.get<EditEmployee>(this.basePath + `${id}`)
  }

  updateEmployee(employee: EditEmployee, id: number): Observable<Registration> {
    return this.http.put<Registration>(this.basePath + `updateEmployee/${id}`, employee);
  }

  logout(): void {
    this.router.navigate(['/']).then((_) => {
      this.tokenStorage.clear();
      this.user$.next({ username: '', id: 0, role: '' });
    });
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || '';
    const user: User = {
      id: +jwtHelperService.decodeToken(accessToken).id,
      username: jwtHelperService.decodeToken(accessToken).username,
      role: jwtHelperService.decodeToken(accessToken).role,
    };
    this.user$.next(user);
  }

  setToken(authenticationResponse: AuthenticationResponse) {
    this.tokenStorage.saveAccessToken(authenticationResponse.token);
    this.setUser();
  }

  getJwtToken(): string | null {
    return this.tokenStorage.getAccessToken(); 
  }

  canChangeUsername(username: string): Observable<BooleanResponseDTO> {
    const path = this.basePath + 'can-change-username/' + username;
    return this.http.get<BooleanResponseDTO>(path);
  }

  canChangeEmail(email: string): Observable<BooleanResponseDTO> {
    const path = this.basePath + 'can-change-email/' + email;
    return this.http.get<BooleanResponseDTO>(path);
  }

}