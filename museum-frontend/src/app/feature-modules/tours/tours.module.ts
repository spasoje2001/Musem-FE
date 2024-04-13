import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { AdministrationModule } from "../administration/administration.module";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { AddTourFormComponent } from "./components/add-tour-form/add-tour-form.component";
import { TourCardViewComponent } from "./components/tour-card-view/tour-card-view.component";
import { TourViewComponent } from "./components/tour-view/tour-view.component";

@NgModule({
  declarations: [
    TourViewComponent,
    TourCardViewComponent,
    AddTourFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,  
    MaterialModule,
    AdministrationModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  exports: [
    TourViewComponent
  ]
})
export class ToursModule { 

}