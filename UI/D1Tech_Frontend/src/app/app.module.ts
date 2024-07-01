import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TravelPlaceAddressComponent } from './TravelPlaceAddress/TravelPlaceAddress.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginProcessComponent } from './LoginProcess/LoginProcess.component';
import { TravelPlacesComponent } from './TravelPlaces/TravelPlaces.component';
import { AuthenticationService } from './Services/Authentication.service';
import { RegisterComponent } from './Register/Register.component';

@NgModule({
  declarations: [			
    AppComponent,
      TravelPlaceAddressComponent,
      LoginProcessComponent,
      TravelPlacesComponent,
      RegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    {provide:"baseUrl",useValue:"https://localhost:7056/api",multi:true},
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
