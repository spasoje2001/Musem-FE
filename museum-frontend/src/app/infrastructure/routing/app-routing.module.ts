import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { RegistrationComponent } from "../auth/registration/registration.component";
import { EmployeesViewComponent } from "src/app/feature-modules/administration/components/employees-view/employees-view.component";
import { UserProfileComponent } from "src/app/feature-modules/stakeholder/components/user-profile/user-profile.component";
import { EditProfileComponent } from "src/app/feature-modules/stakeholder/components/edit-profile/edit-profile.component";
import { ArtifactsComponent } from "src/app/feature-modules/items/artifacts/artifacts.component";
import { ExhibitionsViewComponent } from "src/app/feature-modules/exhibitions/exhibitions-view/exhibitions-view.component";
import { ExhibitionDetailsComponent } from "src/app/feature-modules/exhibitions/exhibition-details/exhibition-details.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}