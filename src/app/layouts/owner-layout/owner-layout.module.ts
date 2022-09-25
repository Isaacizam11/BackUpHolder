import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerLayoutComponent } from './owner-layout.component';
import { SharedModule } from 'app/shared/shared.module';
import { AdminLayoutRoutes } from '../admin-layout/admin-layout.routing';
import { OwnerLayoutRoutes } from './owner-layout.routing';
import { RouterModule } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { RoomDialogComponent } from './dialogs/RoomDialog/RoomDialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(OwnerLayoutRoutes),
  ],
  declarations: [
    RoomComponent,
    RoomDialogComponent
  ]
})
export class OwnerLayoutModule { }
