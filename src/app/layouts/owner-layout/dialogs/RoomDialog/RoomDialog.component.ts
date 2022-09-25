import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomService } from '../../../../services/room.service';

@Component({
  selector: 'app-RoomDialog',
  templateUrl: './RoomDialog.component.html',
  styleUrls: ['./RoomDialog.component.scss']
})
export class RoomDialogComponent implements OnInit {

  formCentre: FormGroup;
  roomsType: any[] =[]
  isEditable: boolean = false
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private roomService: RoomService
  ) {}

  async ngOnInit() {
    const edit = this.data.edit;
    this.isEditable = edit;
   await this.getRoomsTypes()
    console.log(this.data);
    this.formCentre = this.fb.group({
      roomNumber: ["", Validators.required],
      roomName: ["", Validators.required],
      typeId: ["", Validators.required],

    });

    edit == true ? this.populateForm(this.data.room) : "";
  }

  onSubmit() {
    console.log(this.formCentre.valid)

    if(this.formCentre.valid) {
      console.error(this.formCentre.valid);
      if(this.data.edit == true) {
        this.roomService.updateRoom(this.formCentre.value, this.data.centre.CentreId).subscribe(data => {
          this.Close();
        })
      } else {
        this.roomService.AddRoom(this.formCentre.value).subscribe(data => {
          console.error(data);
          this.Close();
        },
        err => {
          console.error(err);

        })
      }

    }

  }
  getRoomsTypes() {
    this.roomService.getRoomsTypes().subscribe(res => {
        console.log(res);
        this.roomsType = res;
    })
  }



  populateForm(data) {
    this.formCentre.patchValue({
      roomName: data.roomName,
      roomNumber: data.roomNumber,
      typeId: data.typeId,

    });
  }
  Close() {
    this.dialog.closeAll();
  }
}
