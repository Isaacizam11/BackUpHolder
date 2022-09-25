import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CourseService as CoreServe} from '../services/course.service';
import { CourseDialogComponent } from '../diallogs/course-dialog/course-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses: any[] = [];
  public query: any = '';

  constructor(public dialog: MatDialog, private CoreServeERD: CoreServe) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.CoreServeERD.getAllCourses().subscribe(result => {
        this.courses =  result;
        console.log(this.courses)
    })
  }

  RemoveCourse(courseId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.CoreServeERD.deleteCourse(courseId).subscribe((result) => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        },error => {

        })

      }
    })
  }


  EditCourse(course) {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: true, course: course }
    const dialogReference = this.dialog.open(
      CourseDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getCourses();
    })
  }

  AddCourse() {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: false}
    const dialogReference = this.dialog.open(
      CourseDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getCourses();
    })
  }
}
