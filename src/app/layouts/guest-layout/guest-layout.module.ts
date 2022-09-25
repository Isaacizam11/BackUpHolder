import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestLayoutComponent } from './guest-layout.component';
import { RouterModule } from '@angular/router';
import { GuestLayoutRoutes } from './guest-layout.routing';
import { SharedModule } from 'app/shared/shared.module';
import { BookingComponent } from './booking/booking.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DemoMaterialModule } from 'app/shared/material.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GuestLayoutRoutes),
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    DemoMaterialModule
  ],

    declarations: [BookingComponent,UserProfileComponent,DashboardComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-za' }]
})
export class GuestLayoutModule { }
