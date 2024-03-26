import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "src/app/feature-modules/layout/home/home.component";

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent 
  },
  /*
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: UserRegistrationComponent 
  },
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}