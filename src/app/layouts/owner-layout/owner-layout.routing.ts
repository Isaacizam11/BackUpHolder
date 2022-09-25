import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { RoomComponent } from "./pages/room/room.component";

export const  OwnerLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "manage-rooms",
        component: RoomComponent,
      },
    ],
  },

  { path: "dashboard", component: DashboardComponent },


];
