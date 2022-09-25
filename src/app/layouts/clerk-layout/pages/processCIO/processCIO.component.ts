import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "app/auth/auth.service";
import { ClerkService } from "app/services/clerk.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-processCIO",
  templateUrl: "./processCIO.component.html",
  styleUrls: ["./processCIO.component.scss"],
})
export class ProcessCIOComponent implements OnInit {
  roomsBooked: unknown[] = [];

  constructor(private clerkService: ClerkService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getBookedUsers();
  }

  Check(room: any, isCheckin: boolean, user) {
    let action = isCheckin ? "checkin" : "checkOut";
    let label = isCheckin ? "check in" : "check out";

    Swal.fire({
      title: `Are you sure you want to ${
        isCheckin ? "check in" : "check out"
      } the ${user.FirstName} ${user.Surname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.clerkService.checkIn(room.bookId, action).subscribe(
          (result) => {
            Swal.fire("Chec!", label + " successfully ", "success");
            this.roomsBooked = [];
            this.getBookedUsers();
          },
          (error) => {}
        );
      }
    });
  }

  getBookedUsers() {
    this.clerkService.getUsersBooked().subscribe((roomsUsers: any) => {
      console.log(roomsUsers);
      this.roomsBooked = roomsUsers;
    });
  }
}
