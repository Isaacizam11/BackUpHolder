import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CourseService } from "../../services/course.service";
import { SubjectsService } from "../../services/subjects.service";



@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  formCentre: FormGroup;
  subjects: any[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private courseService: CourseService,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit() {
    this.getSubjects()
    const edit = this.data.edit;
    this.formCentre = this.fb.group({
      CourseDesc: ["", Validators.required],
      SubjectId: ["", Validators.required],
    });

    edit == true ? this.populateForm(this.data.course) : "";
  }

  onSubmit() {
    console.log(this.formCentre.valid)

    if(this.formCentre.valid) {
      if(this.data.edit == true) {
        this.courseService.updateCourse(this.formCentre.value, this.data.course.CourseId).subscribe(data => {
          this.Close();
        })
      } else {
        this.courseService.AddCourse(this.formCentre.value).subscribe(data => {
          this.Close();
        })
      }

    }

  }

  populateForm(data) {
    this.formCentre.patchValue({
      CourseDesc: data.CourseDesc,
      SubjectId: data.SubjectId,
    });
  }
  Close() {
    this.dialog.closeAll();
  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe(res => {
        this.subjects = res;
    })
  }

}
