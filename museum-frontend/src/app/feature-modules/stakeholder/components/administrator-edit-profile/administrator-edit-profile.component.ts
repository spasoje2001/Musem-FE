import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Administrator } from '../../model/administrator.model';
import { GuestEditProfile } from '../../model/guest-edit-profile.mode';
import { GuestService } from '../../services/guest.service';
import { AdministratorService } from '../../services/administrator.service';
import { AdministratorEditProfile } from '../../model/administrator-edit-profile.model';

@Component({
  selector: 'app-administrator-edit-profile',
  templateUrl: './administrator-edit-profile.component.html',
  styleUrls: ['./administrator-edit-profile.component.css', '../shared-styles.css']
})
export class AdministratorEditProfileComponent {

  administrator?: Administrator;
  canChangeUsername: Boolean = true;
  canChangeEmail: Boolean = true;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    biography: new FormControl(''),
  })

  constructor(
    private administratorService: AdministratorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGuest();
  }

  loadGuest(): void {
    this.administratorService.getLoggedInAdministrator().subscribe(administrator => {
      this.administrator = administrator;

      this.profileForm.controls['firstName'].setValue(this.administrator.firstName);
      this.profileForm.controls['lastName'].setValue(this.administrator.lastName);
      this.profileForm.controls['username'].setValue(this.administrator.username);
      this.profileForm.controls['email'].setValue(this.administrator.email);
      this.profileForm.controls['biography'].setValue(this.administrator.biography);
    });
  }

  update() {
    if (this.canChangeEmail && this.canChangeUsername) {
      var updated: AdministratorEditProfile = {
        username: this.profileForm.value.username || '',
        firstName: this.profileForm.value.firstName || '',
        lastName: this.profileForm.value.lastName || '',
        email: this.profileForm.value.email || '',
        biography: this.profileForm.value.biography || '',
      };
  
      this.administratorService.updateProfile(updated).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        }
      })
    }
  }

  canChangeUsernameCheck() {
    const username = this.profileForm.value.username;
    this.authService.canChangeUsername(username || '').subscribe({
      next: (result) => {
        this.canChangeUsername = result.value;
      },
    })
  }

  canChangeEmailCheck() {
    const email = this.profileForm.value.email;
    this.authService.canChangeEmail(email || '').subscribe({
      next: (result) => {
        this.canChangeEmail = result.value;
      },
    })
  }

}
