import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialModule } from "src/app/infrastructure/material/material-module";
import { AdministrationModule } from "../administration/administration.module";
import { TourViewComponent } from "./tour-view/tour-view.component";
import { TourCardViewComponent } from './tour-card-view/tour-card-view.component';
import { AddTourFormComponent } from './add-tour-form/add-tour-form.component';

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
    AdministrationModule
  ],
  exports: [
    TourViewComponent
  ]
})
export class ToursModule { 

}