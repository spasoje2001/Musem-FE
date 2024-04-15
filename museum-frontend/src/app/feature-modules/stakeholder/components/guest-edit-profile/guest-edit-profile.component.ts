import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { GuestEditProfile } from '../../model/guest-edit-profile.mode';
import { Guest } from '../../model/guest.model';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest-edit-profile',
  templateUrl: './guest-edit-profile.component.html',
  styleUrls: ['./guest-edit-profile.component.css', '../shared-styles.css']
})
export class GuestEditProfileComponent {

  guest?: Guest;
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
    private guestService: GuestService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGuest();
  }

  loadGuest(): void {
    this.guestService.getLoggedInGuest().subscribe(guest => {
      this.guest = guest;

      this.profileForm.controls['firstName'].setValue(this.guest.firstName);
      this.profileForm.controls['lastName'].setValue(this.guest.lastName);
      this.profileForm.controls['username'].setValue(this.guest.username);
      this.profileForm.controls['email'].setValue(this.guest.email);
      this.profileForm.controls['biography'].setValue(this.guest.biography);
    });
  }

  update() {
    if (this.canChangeEmail && this.canChangeUsername) {
      var updated: GuestEditProfile = {
        username: this.profileForm.value.username || '',
        firstName: this.profileForm.value.firstName || '',
        lastName: this.profileForm.value.lastName || '',
        email: this.profileForm.value.email || '',
        biography: this.profileForm.value.biography || '',
      };
  
      this.guestService.updateProfile(updated).subscribe({
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
