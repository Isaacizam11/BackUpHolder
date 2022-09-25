import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../guest-layout/dashboard/dashboard.component';
import { ProcessCIOComponent } from './pages/processCIO/processCIO.component';

export const ClerkLayoutRoutes: Routes = [
  { path: "checkIn-process", component: ProcessCIOComponent },
  { path: "dashboard", component: DashboardComponent },

];

