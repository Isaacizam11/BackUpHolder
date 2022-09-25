import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
declare var $;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private isloggedin$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  readonly BaseURI = 'https://localhost:44318/api/Access';


  register(formData) {
    const body = {
      FirstName: formData.FirstName,
      Email: formData.Email,
      Username: formData.Email,
      Name: formData.Name,
      Surname: formData.Surname,
      Password: formData.Passwords.Password,
      isGuest: true,
      IdNumber: formData.IdNumber,
    };
    console.log(body)
    return this.http.post(this.BaseURI + '/Register/1', body);
  }

  login(formData) {
    console.log("login")
    return this.http.post(this.BaseURI + '/Login/', formData);
  }

  setLoggedin(object: boolean) {
    this.isloggedin$.next(object);
  }

  get isLoggedIn() {
    return true ;
  }
  Logout() {

    sessionStorage.removeItem('id');
    sessionStorage.removeItem('rle');
    sessionStorage.removeItem('typ');

    this.setLoggedin(false);
    this.router.navigateByUrl('/login');
  }

  setUserID(userID) {
    sessionStorage.setItem('id', userID.toString());
  }

 get getUserID () {
   const id = Number(sessionStorage.getItem('id'));
   return id;
  }

  setUserRole(role) {
    sessionStorage.setItem('rle', role.toString());
  }

  setUserType(type) {
    sessionStorage.setItem('typ', type.toString());
  }
  get getUserType () {
    const id = Number(sessionStorage.getItem('typ'));
    return id;
   }
  get getUserRole () {
    const id = Number(sessionStorage.getItem('rle'));
    return id;
   }
   getTypes():  Observable<any[]> {
    return this.http.get<any[]>('https://localhost:44318/api/Users/getUserTypes');
  }


}


