import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RoomDialogComponent } from '../../dialogs/RoomDialog/RoomDialog.component';
import { RoomService } from '../../../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
rooms: any[] = [];
  constructor(private roomService: RoomService,public dialog: MatDialog,) { }
  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getRooms().subscribe(res => {
        console.log(res);
        this.rooms = res;
    })
  }


  addRoom() {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: false}
    const dialogReference = this.dialog.open(
      RoomDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getRooms();
    })
  }
  editRoom(course) {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: true, room: {roomName: course.RoomName, roomNumber: course.RoomNumber, typeId: 1} }
    const dialogReference = this.dialog.open(
      RoomDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getRooms();
    })
  }

  removeRoom(id) {
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

        this.roomService.deleteRoom(id).subscribe((result) => {
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
