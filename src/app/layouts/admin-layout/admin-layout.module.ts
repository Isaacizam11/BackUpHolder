import { CourseComponent } from './course/course.component';
import { SubjectComponent } from './subject/subject.component';
import { CentreComponent } from './centre/centre.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { NotificationsComponent } from './notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { AdminDashboardComponent } from './AdminDashboard/AdminDashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { CentreDialogComponent } from './diallogs/centre-dialog/centre-dialog.component';
import { SubjectDialogComponent } from './diallogs/subject-dialog/subject-dialog.component';
import { CourseDialogComponent } from './diallogs/course-dialog/course-dialog.component';
import { RegisteredLearnersComponent } from './registered-learners/registered-learners.component';
import { SearchFilterPipe } from './pipe';
import { DemoMaterialModule } from 'app/shared/material.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    SharedModule,
    DemoMaterialModule
  ],
  declarations: [
    AdminDashboardComponent,
    NotificationsComponent,
    SubjectComponent,
    CourseComponent,
    CentreDialogComponent,
    SubjectDialogComponent,
    CourseDialogComponent,
    RegisteredLearnersComponent,

  ]
})

export class AdminLayoutModule {}
