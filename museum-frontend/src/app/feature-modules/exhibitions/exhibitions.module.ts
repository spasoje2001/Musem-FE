import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsViewComponent } from './exhibitions-view/exhibitions-view.component';
import { ExhibitionCardComponent } from './exhibition-card/exhibition-card.component';
import { ExhibitionDetailsComponent } from './exhibition-details/exhibition-details.component';
import { ProposeExhibitionComponent } from './propose-exhibition/propose-exhibition.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExhibitionsViewComponent,
    ExhibitionCardComponent,
    ExhibitionDetailsComponent,
    ProposeExhibitionComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ExhibitionCardComponent
  ]
})
export class ExhibitionsModule { }
