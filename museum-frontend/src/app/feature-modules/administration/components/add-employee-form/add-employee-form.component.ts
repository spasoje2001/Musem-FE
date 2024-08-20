import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Registration, Role } from 'src/app/infrastructure/auth/model/registration.model';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css'],
  animations: [
    trigger('buttonState', [
      state('clicked', style({
        transform: 'scale(0.9)',
        opacity: 0.5
      })),
      transition('* => clicked', [
        animate('200ms')
      ]),
      transition('clicked => idle', [
        animate('200ms')
      ])
    ]),
  ]
})
export class AddEmployeeFormComponent implements OnInit{
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AddEmployeeFormComponent>){
    this.isPasswordVisible = false;
    this.isRepeatPasswordVisible = false;
  }

  ngOnInit(): void {
    
  }

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatpassword: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  buttonState: string = 'idle'; 
  focused: string = '';

  addEmployeeButtonClicked(): void {
    const selectedRoleString: string = this.registrationForm.value.role ?? '';
    let selectedRole: Role;

    switch (selectedRoleString) {
        case 'Curator':
            selectedRole = Role.Curator;
            break;
        case 'Organizer':
            selectedRole = Role.Organizer;
            break;
        default:
            console.error("Invalid role selected.");
            return; 
    }

    const registration: Registration = {
      firstName: this.registrationForm.value.firstName || "",
      lastName: this.registrationForm.value.lastName || "",
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
      role: selectedRole,
    };

    console.log(registration);

    if (this.registrationForm.valid) {
      if(this.registrationForm.value.password === this.registrationForm.value.repeatpassword){
        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 
        this.authService.registerEmployee(registration).subscribe({
          next: () => {
            this.dialogRef.close();
          },
        });
      } 
      else{
        console.log('Passwords do not match!'); // Treba dodati neki vid validacije
      }
    }
    else{
      console.log('Sign up form not valid!'); // Treba dodati neki vid validacije
    }
  }

  cancelButtonClicked() {
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  faEye = faEye;
  faEyeSlash = faEyeSlash;
}
