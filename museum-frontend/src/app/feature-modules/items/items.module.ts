import { CommonModule } from "@angular/common";
import { ArtifactFormComponent } from "./artifact-form/artifact-form.component";
import { ArtifactsComponent } from "./artifacts/artifacts.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { EmployeesViewComponent } from "../administration/employees-view/employees-view.component";

@NgModule({
    declarations: [
      ArtifactsComponent,
      ArtifactFormComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      FontAwesomeModule,  
      MaterialModule
    ],
    exports: [
      ArtifactFormComponent
    ]
  })
  export class ItemsModule { 
  
  }