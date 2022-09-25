import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  constructor(private http: HttpClient, private router: Router) { }

 readonly BaseURI = 'https://localhost:44318/api/Subjects/';


 getSubjects():  Observable<any[]> {
  return this.http.get<any[]>(this.BaseURI  + 'getSubjects');
}

updateSubject(Subject, id: number):  Observable<any> {
  return this.http.post(this.BaseURI + 'EditSubject/'+id, Subject);
}

AddSubject(Subject):  Observable<any> {
  return this.http.post(this.BaseURI + 'CreateSubject/', Subject);
}
deleteSubject(id) {
  return this.http.delete(this.BaseURI + 'DeleteSubject/'+id);
}

}
