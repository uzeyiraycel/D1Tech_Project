import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginProcessComponent } from './LoginProcess/LoginProcess.component';
import { TravelPlacesComponent } from './TravelPlaces/TravelPlaces.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginProcessComponent },
  { path: 'travel-places', component: TravelPlacesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
