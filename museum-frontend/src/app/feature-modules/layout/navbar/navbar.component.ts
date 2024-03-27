import { Component } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { 
  faUser,
  faSignOut,
  faSignIn,
  faFileText,
  faHome
 } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  faUser = faUser;
  faSignOut = faSignOut;
  faSignIn = faSignIn;
  faFileText = faFileText;
  faHome = faHome;
}
