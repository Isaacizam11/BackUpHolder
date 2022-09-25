import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {

  constructor(private http: HttpClient, private router: Router) { }

  readonly BaseURI = 'https://localhost:44318/api/clerk/';

  checkIn(id: number, action): Observable<unknown> {
    return this.http.post<unknown>(this.BaseURI + action+'/'+id,{});
  }

  checkOut(id: number): Observable<unknown> {
    return this.http.post<unknown>(this.BaseURI + 'checkin/'+id,{});
  }
  getUsersBooked(): Observable<unknown[]> {
    return this.http.get<unknown[]>(this.BaseURI + 'GetUsersBooked');
  }

}
