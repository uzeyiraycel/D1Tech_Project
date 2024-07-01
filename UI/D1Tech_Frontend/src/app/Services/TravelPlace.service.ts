import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelPlace } from '../Models/TravelPlace';
import { lastValueFrom } from 'rxjs';
import { TravelPlaceAddresses } from '../Models/TravelPlaceAddresses';

const apiUrl = "https://localhost:7056/api/TravelPlaces/";

@Injectable({
  providedIn: 'root'
})
export class TravelPlaceService {

  constructor(private http: HttpClient) { }


  //-----------------------Travel Place CRUD--------------------------------------------

  getTravelPlaces(): Promise<TravelPlace[]> {
    let url = `${apiUrl}GetTravelPlaces`;
    let data = this.http.get<TravelPlace[]>(url);
    return lastValueFrom(data);
  }

  saveTravel(travelPlace: TravelPlace): Promise<any> {
    let url = `${apiUrl}SaveTravel`;
    let data = this.http.post<any>(url, travelPlace);
    return lastValueFrom(data);
  }

  getTravel(id: string): Promise<TravelPlace> {
    let url = `${apiUrl}GetTravel?id=${id}`;
    let data = this.http.get<TravelPlace>(url);
    return lastValueFrom(data);
  }

  deleteTravelPlace(id: string): Promise<any> {
    const url = `${apiUrl}DeleteTravelPlace?id=${id}`;
    const data = this.http.delete<any>(url);
    return lastValueFrom(data);
  }


  //-----------------------Travel Place Address CRUD--------------------------------------------

  getTravelPlaceAddresses(id: string): Promise<TravelPlaceAddresses[]> {
    let url = `${apiUrl}GetTravelPlaceAddresses?id=${id}`;
    let data = this.http.get<TravelPlaceAddresses[]>(url);
    return lastValueFrom(data);
  }

  savePlaceAddress(travelPlaceAddresses: TravelPlaceAddresses): Promise<any> {
    let url = `${apiUrl}SavePlaceAddress`;
    let data = this.http.post<any>(url, travelPlaceAddresses);
    return lastValueFrom(data);
  }


  getTravelPlaceAddress(id: string): Promise<TravelPlaceAddresses> {
    let url = `${apiUrl}GetTravelPlaceAddress?id=${id}`;
    let data = this.http.get<TravelPlaceAddresses>(url);
    return lastValueFrom(data);
  }

  deleteTravelPlaceAddress(id: string): Promise<any> {
    const url = `${apiUrl}DeleteTravelPlaceAddress?id=${id}`;
    const data = this.http.delete<any>(url);
    return lastValueFrom(data);
  }

}
