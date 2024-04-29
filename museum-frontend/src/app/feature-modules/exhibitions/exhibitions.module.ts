import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsViewComponent } from './exhibitions-view/exhibitions-view.component';
import { ExhibitionCardComponent } from './exhibition-card/exhibition-card.component';
import { ExhibitionDetailsComponent } from './exhibition-details/exhibition-details.component';



@NgModule({
  declarations: [
    ExhibitionsViewComponent,
    ExhibitionCardComponent,
    ExhibitionDetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExhibitionCardComponent
  ]
})
export class ExhibitionsModule { }
