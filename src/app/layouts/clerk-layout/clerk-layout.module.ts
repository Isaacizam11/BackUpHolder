import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClerkLayoutComponent } from './clerk-layout.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { ProcessCIOComponent } from './pages/processCIO/processCIO.component';
import { ClerkLayoutRoutes } from './clerk-layout.routing';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    RouterModule.forChild(ClerkLayoutRoutes),
    MatCardModule
  ],
  declarations: [ClerkLayoutComponent, ProcessCIOComponent,DashboardComponent]
})
export class ClerkLayoutModule { }
