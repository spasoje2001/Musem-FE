import { Component, OnInit } from '@angular/core';
import { Guest } from '../../model/guest.model';
import { GuestService } from '../../services/guest.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', '../shared-styles.css']
})
export class UserProfileComponent implements OnInit {

  user?: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
  }

}
