import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { RoomService } from 'app/services/room.service';
import { ToastrService } from 'app/services/Toastr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileModel: FormGroup;
  userTypes: unknown[] =[];
  roomsAvailable: unknown[] =[];

  constructor(private auth: AuthService, private roomService: RoomService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    const id =  this.auth.getUserID;
    this.getProfile(id);
    this.getUserTypes()

    this.profileModel = this.fb.group({
      Username: [{value: '',disabled: true}, Validators.required,],
      FirstName: ['', Validators.required],
      Surname: ['', Validators.required],
    });
  }

  onSubmit() {
    // this.courses.UpdateUser(this.profileModel.value,this.auth.getUserID).subscribe(result =>{
    //   console.log(result);
    //   this.auth.setUserType(result.UserTypeId)
    //   this.toastr.showNotification("successfully updated!",1);

    // })
  }

  Book(room) {

    let book = {
      roomId: room.roomId,
      bookingId: room.bookId,
    }
    Swal.fire({
      title: 'Are you sure you want to cancel the booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.roomService.cancelBooking(book).subscribe((result) => {
          Swal.fire(
            'Booked!',
            'Room successfully cancelled.',
            'success'
          )
          const id =  this.auth.getUserID;
          this.getProfile(id);

        }, error => {

        })

      }
    })
  }

  getProfile(id: number) {
    this.roomService.getProfile(id).subscribe((profile:any) => {
      console.log(profile);
      this.roomsAvailable = profile.BookedRooms
      this.profileModel.patchValue({
        Username: profile.Username,
        FirstName: profile.FirstName,
        Surname: profile.Surname,
      })

    })
  }
  getUserTypes() {

    this.auth.getTypes().subscribe(res => {
      console.log(res);
      this.userTypes =  res;
    })
  }

}
