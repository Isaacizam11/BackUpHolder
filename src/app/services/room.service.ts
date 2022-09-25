import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(private http: HttpClient, private router: Router) { }

  readonly BaseURI = 'https://localhost:44318/api/rooms/';


  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI);
  }

  getRoomsTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + 'GetRoomsTypes');
  }

  updateRoom(Room, id: number): Observable<any> {
    return this.http.post(this.BaseURI + id, Room);
  }

  AddRoom(Room): Observable<any> {
    return this.http.post(this.BaseURI, Room);
  }
  deleteRoom(id) {
    return this.http.delete(this.BaseURI + id);
  }

  checkRoomAvailability(typeId, range, Amenities): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    let data = {
      typeId, ...range, amenities: [...Amenities]
    }
    console.log(data);
    return this.http.post('https://localhost:44318/api/booking/check-availability/' + typeId, data, httpOptions);
  }

  bookRoom(booking) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('https://localhost:44318/api/booking/book', booking, httpOptions)
  }

  cancelBooking(booking) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('https://localhost:44318/api/booking/cancelbooking', booking, httpOptions)
  }
  getAmenities(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:44318/api/booking/GetAmenities');
  }

  getProfile(id: number):  Observable<any[]> {
    return this.http.get<any>('https://localhost:44318/api/booking/GetProfile/'+ id);
  }


}
