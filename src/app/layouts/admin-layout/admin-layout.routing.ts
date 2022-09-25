import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { BookingComponent } from "../guest-layout/booking/booking.component";
import { UserProfileComponent } from "../guest-layout/user-profile/user-profile.component";
import { RoomComponent } from "../owner-layout/pages/room/room.component";
import { AdminDashboardComponent } from "./AdminDashboard/AdminDashboard.component";
import { CentreComponent } from "./centre/centre.component";
import { CourseComponent } from "./course/course.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { RegisteredLearnersComponent } from "./registered-learners/registered-learners.component";
import { SubjectComponent } from "./subject/subject.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: AdminDashboardComponent,
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "notifications",
        component: NotificationsComponent,
      },
    ],
  },

  { path: "courses", component: CourseComponent },
  { path: "subjects", component: SubjectComponent },
  { path: "centres", component: CentreComponent },
  { path: "registered-learners", component: RegisteredLearnersComponent },
  {
    path: "",
    children: [
      {
        path: "manage-rooms",
        component: RoomComponent,
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "book-room",
        component: BookingComponent,
      },
    ],
  },
  {
    path: '',
    children: [ {
      path: 'userprofile',
      component: UserProfileComponent
    }]
    },

];
