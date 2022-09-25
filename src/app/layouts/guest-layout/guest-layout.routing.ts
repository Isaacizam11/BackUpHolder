import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { BookingComponent } from "./booking/booking.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

export const  GuestLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "book-room", component: BookingComponent },
  {
    path: '',
    children: [ {
      path: 'userprofile',
      component: UserProfileComponent
    }]
    },
];
