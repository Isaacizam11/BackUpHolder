import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CentreDialogComponent } from '../diallogs/centre-dialog/centre-dialog.component';
import { CentreService } from '../services/centre.service';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.scss']
})
export class CentreComponent implements OnInit {

  centres: any[] = [];
  public query: any = '';

  constructor(public dialog: MatDialog, private centreService: CentreService) { }

  ngOnInit() {
    this.getCentres();
  }

  getCentres() {

  }

  RemoveCourse(CentreId) {
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

        this.centreService.deleteCentre(CentreId).subscribe((result) => {
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


  EditCentre(centre) {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: true, centre: centre }
    const dialogReference = this.dialog.open(
      CentreDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getCentres();
    })
  }

  AddCentre() {
    const dialog = new MatDialogConfig;
    dialog.disableClose = false;
    dialog.width = '20rem';
    dialog.height = 'auto';
    dialog.data = { add: 'yes', edit: false}
    const dialogReference = this.dialog.open(
      CentreDialogComponent,
      dialog
    );
    dialogReference.afterClosed().subscribe(result => {
      this.getCentres();
    })
  }
}
