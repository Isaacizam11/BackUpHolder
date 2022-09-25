import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { LazyLoadScriptService } from './services/lazy-load-script.service';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './auth/landing/landing.component';
import { DocumentService } from './shared/Document.service';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { OwnerLayoutComponent } from './layouts/owner-layout/owner-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,


    AppRoutingModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GuestLayoutComponent,
    OwnerLayoutComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent


  ],

  providers: [LazyLoadScriptService,DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
