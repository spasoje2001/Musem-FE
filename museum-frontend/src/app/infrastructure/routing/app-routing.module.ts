import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { EmployeesViewComponent } from "src/app/feature-modules/administration/components/employees-view/employees-view.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/components/user-profile/user-profile.component";
import { EditProfileComponent } from "src/app/feature-modules/stakeholder/components/edit-profile/edit-profile.component";
import { TourViewComponent } from "src/app/feature-modules/tours/components/tour-view/tour-view.component";
import { TourRequestsViewComponent } from "src/app/feature-modules/tours/components/tour-requests-view/tour-requests-view.component";
import { ArtifactsComponent } from "src/app/feature-modules/items/artifacts/artifacts.component";
import { ExhibitionsViewComponent } from "src/app/feature-modules/exhibitions/exhibitions-view/exhibitions-view.component";
import { ExhibitionDetailsComponent } from "src/app/feature-modules/exhibitions/exhibition-details/exhibition-details.component";
import { CleaningHandlingViewComponent } from "src/app/feature-modules/cleaning/cleaning-handling-view/cleaning-handling-view.component";
import { ItemsCleaningViewComponent } from "src/app/feature-modules/cleaning/items-cleaning-view/items-cleaning-view.component";
import { CreateEventComponent } from "src/app/feature-modules/events/create-event/create-event.component";
import { UpdateEventComponent } from "src/app/feature-modules/events/update-event/update-event.component";
import { ArtifactForDisplayComponent } from "src/app/feature-modules/items/artifact-for-display/artifact-for-display.component";

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegistrationComponent 
  },
  {
    path: 'employee-view',
    component: EmployeesViewComponent
  },
  {
    path: 'tour-view',
    component: TourViewComponent
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: UserProfileComponent
      },
      {
        path: 'edit',
        component: EditProfileComponent
      }
    ]
  },
  {
    path: 'request-view',
    component: TourRequestsViewComponent
  },
  {
    path: 'item-view',
    component: ArtifactsComponent
  },
  {
    path: 'exhibitions-view',
    component: ExhibitionsViewComponent
  },
  {
    path: 'exhibitions/:id', // Define the route parameter :id
    component: ExhibitionDetailsComponent
  },
  {
    path: 'cleaning-proposals-view',
    component: CleaningHandlingViewComponent
  },
  {
    path: 'items-for-cleaning-view',
    component: ItemsCleaningViewComponent
  },
  {
    path: 'events/create',
    component: CreateEventComponent
  },
  {
    path: 'events/update/:id',
    component: UpdateEventComponent
  },
  {
    path: 'items-for-display-view',
    component: ArtifactForDisplayComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}