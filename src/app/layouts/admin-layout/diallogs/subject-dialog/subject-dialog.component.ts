import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent implements OnInit {

  formSubject: FormGroup;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private subjectService: SubjectsService
  ) {}

  ngOnInit() {
    const edit = this.data.edit;
    console.log(this.data);
    this.formSubject = this.fb.group({
      SubjectDesc: ["", Validators.required],
    });

    edit == true ? this.populateForm(this.data.subject) : "";
  }

  onSubmit() {
    console.log(this.formSubject.valid)

    if(this.formSubject.valid) {
      if(this.data.edit == true) {
        this.subjectService.updateSubject(this.formSubject.value, this.data.subject.SubjectId).subscribe(data => {
          this.Close();
        })
      } else {
        this.subjectService.AddSubject(this.formSubject.value).subscribe(data => {
          this.Close();
        })
      }

    }

  }

  populateForm(data) {
    this.formSubject.patchValue({
      SubjectDesc: data.SubjectDesc,
    });
  }
  Close() {
    this.dialog.closeAll();
  }
}