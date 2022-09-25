import { LandingComponent } from './auth/landing/landing.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { OwnerLayoutComponent } from './layouts/owner-layout/owner-layout.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "landing", component: LandingComponent },


  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "guest",
    component: GuestLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/guest-layout/guest-layout.module").then(
            (m) => m.GuestLayoutModule
          ),
      },
    ],
  },
  {
    path: "owner",
    component: OwnerLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/owner-layout/owner-layout.module").then(
            (m) => m.OwnerLayoutModule
          ),
      },
    ],
  },
  {
    path: "clerk",
    component: OwnerLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/clerk-layout/clerk-layout.module").then(
            (m) => m.ClerkLayoutModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
