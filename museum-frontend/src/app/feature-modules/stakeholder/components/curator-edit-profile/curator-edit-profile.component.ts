import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CuratorEditProfile } from '../../model/curator-edit-profile.model';
import { Curator } from '../../model/curator.model';
import { CuratorService } from '../../services/curator.service';

@Component({
  selector: 'app-curator-edit-profile',
  templateUrl: './curator-edit-profile.component.html',
  styleUrls: ['./curator-edit-profile.component.css', '../shared-styles.css']
})
export class CuratorEditProfileComponent {

  curator?: Curator;
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
    private curatorService: CuratorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCurator();
  }

  loadCurator(): void {
    this.curatorService.getLoggedInCurator().subscribe(curator => {
      this.curator = curator;

      this.profileForm.controls['firstName'].setValue(this.curator.firstName);
      this.profileForm.controls['lastName'].setValue(this.curator.lastName);
      this.profileForm.controls['username'].setValue(this.curator.username);
      this.profileForm.controls['email'].setValue(this.curator.email);
      this.profileForm.controls['biography'].setValue(this.curator.biography);
    });
  }

  update() {
    if (this.canChangeEmail && this.canChangeUsername) {
      var updated: CuratorEditProfile = {
        username: this.profileForm.value.username || '',
        firstName: this.profileForm.value.firstName || '',
        lastName: this.profileForm.value.lastName || '',
        email: this.profileForm.value.email || '',
        biography: this.profileForm.value.biography || '',
      };
  
      this.curatorService.updateProfile(updated).subscribe({
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
