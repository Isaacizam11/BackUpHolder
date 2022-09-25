import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubjectDialogComponent } from '../diallogs/subject-dialog/subject-dialog.component';
import { SubjectsService } from '../services/subjects.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: any[] = [];
  public query: any = '';


  constructor(private subjectService: SubjectsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe(res => {
        console.log(res);
        this.subjects = res;
    })
  }

  AddSubject() {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: false}
    const dialogReference = this.dialog.open(
      SubjectDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getSubjects();
    })
  }

  EditSubject(subject) {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: true, subject: subject }
    const dialogReference = this.dialog.open(
      SubjectDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getSubjects();
    })
  }



  RemoveSubject(subjectId) {
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

        this.subjectService.deleteSubject(subjectId).subscribe((result) => {
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

}
