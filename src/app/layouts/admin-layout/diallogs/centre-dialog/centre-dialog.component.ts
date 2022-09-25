import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CentreService } from "../../services/centre.service";

@Component({
  selector: "app-centre-dialog",
  templateUrl: "./centre-dialog.component.html",
  styleUrls: ["./centre-dialog.component.scss"],
})
export class CentreDialogComponent implements OnInit {
  formCentre: FormGroup;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CentreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private centreService: CentreService
  ) {}

  ngOnInit() {
    const edit = this.data.edit;
    console.log(this.data);
    this.formCentre = this.fb.group({
      CentreName: ["", Validators.required],
      CentreLocation: ["", Validators.required],
    });

    edit == true ? this.populateForm(this.data.centre) : "";
  }

  onSubmit() {
    console.log(this.formCentre.valid)

    if(this.formCentre.valid) {
      if(this.data.edit == true) {
        this.centreService.updateCentre(this.formCentre.value, this.data.centre.CentreId).subscribe(data => {
          this.Close();
        })
      } else {
        this.centreService.AddCentre(this.formCentre.value).subscribe(data => {
          this.Close();
        })
      }

    }

  }

  populateForm(data) {
    this.formCentre.patchValue({
      CentreLocation: data.CentreLocation,
      CentreName: data.CentreName,
    });
  }
  Close() {
    this.dialog.closeAll();
  }
}
