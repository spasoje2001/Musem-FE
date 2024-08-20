import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Registration, Role} from 'src/app/infrastructure/auth/model/registration.model';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { EditEmployee, EditRole } from 'src/app/infrastructure/auth/model/editEmployee.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-edit-employee-form',
  templateUrl: './edit-employee-form.component.html',
  styleUrls: ['./edit-employee-form.component.css'],
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
export class EditEmployeeFormComponent {
  @Input() employeeId: number | null = null;

  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;
  buttonState: string = 'idle'; 
  focused: string = '';

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<EditEmployeeFormComponent>, @Inject(MAT_DIALOG_DATA) public data : any){
    this.isPasswordVisible = false;
    this.isRepeatPasswordVisible = false;
  }

  ngOnInit(): void {
    console.log(this.data.employeeId);
    if (this.data && this.data.employeeId) {
      this.loadEmployeeData(this.data.employeeId);
    }
  }

  editEmployeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    // Passwords are not required for the update form
    password: new FormControl(''),
    repeatpassword: new FormControl(''),
    role: new FormControl('', [Validators.required]),
  });

  loadEmployeeData(id: number): void {
    console.log(id);
    this.authService.getEmployeeById(id).subscribe({
      next: (employee) => {
        let roleString: string;
        console.log(employee.role)

        switch (employee.role.toString()) {
          case "CURATOR":
            roleString = 'CURATOR';
            break;
          case "ORGANIZER":
            roleString = 'ORGANIZER';
            console.log("organizer")
            break;
          case "RESTAURATEUR":
            roleString = 'RESTAURATEUR';
            break;
        // ... handle other roles as needed
          default:
            roleString = ''; // Or some default role
            break;
      }
        this.editEmployeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          username: employee.username,
          role: roleString,
          // Do not load passwords - they should be entered anew if changed
        }); 
        console.log(employee);
      },
      error: (error) => {
        console.error('Error fetching employee data', error);
      }
    });
  }

  editEmployeeButtonClicked(): void{
    console.log("usao");
    const selectedRoleString: string = this.editEmployeeForm.value.role ?? '';
    let selectedRole: EditRole;

    switch (selectedRoleString) {
        case 'CURATOR':
            selectedRole = EditRole.CURATOR;
            break;
        case 'ORGANIZER':
            selectedRole = EditRole.ORGANIZER;
            break;
        default:
            console.error("Invalid role selected.");
            return; 
    }

    const editEmployee: EditEmployee = {
      firstName: this.editEmployeeForm.value.firstName || "",
      lastName: this.editEmployeeForm.value.lastName || "",
      email: this.editEmployeeForm.value.email || "",
      username: this.editEmployeeForm.value.username || "",
      password: this.editEmployeeForm.value.password || "",
      role: selectedRole,
    };

    if (this.editEmployeeForm.valid) {
      console.log("validno");
      if(this.editEmployeeForm.value.password === this.editEmployeeForm.value.repeatpassword){
        this.buttonState = 'clicked'; 
        setTimeout(() => { this.buttonState = 'idle'; }, 200); 
        if(this.data.employeeId){
          console.log(this.data.employeeId);
          this.authService.updateEmployee(editEmployee, this.data.employeeId).subscribe({
            next: () => {
              this.dialogRef.close();
            },
          });
        }
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
