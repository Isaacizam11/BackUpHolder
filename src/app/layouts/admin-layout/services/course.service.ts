import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private router: Router) { }

  readonly BaseURI = 'https://localhost:44318/api/Courses/';
  readonly BaseURI2= 'https://localhost:44318/api/Users';


  getAllCourses():  Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI2  + '/getAllCoursesCrud');
  }


  AddCourse(Course):  Observable<any> {
    return this.http.post(this.BaseURI + '/CreateCourse/', Course);
  }

  updateCourse(Course, id: number):  Observable<any> {
    return this.http.post(this.BaseURI + 'EditCourse/'+id, Course);
  }

  deleteCourse(id) {
    return this.http.delete(this.BaseURI + '/DeleteCourse/'+id);
  }
  getSpecificCourseStudents(id: number):  Observable<any[]> {
    console.log(id)
    return this.http.get<any[]>('https://localhost:44318/api/Users/getSpecificCourseStudents/'+id);
  }
}
