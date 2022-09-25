import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: number;

}
export const ROUTES: RouteInfo[] = [





    // @owner
    { path: '/owner/dashboard', title: 'Dashboard',  icon:'notifications', class: '' ,role: 1},

    { path: '/owner/manage-rooms', title: 'Manage Rooms',  icon:'notifications', class: '' ,role: 1},
    // @Guest
    { path: '/guest/book-room', title: 'Book Room',  icon:'notifications', class: '' ,role: 2},
    { path: '/guest/userprofile', title: 'User Profile',  icon:'notifications', class: '' ,role: 2},

     // @Clerk
     { path: '/clerk/dashboard', title: 'Dashboard',  icon:'notifications', class: '' ,role: 3},
     { path: '/clerk/checkIn-process', title: 'Check In Customer',  icon:'notifications', class: '' ,role: 3},
     // @Manager

     { path: '/manager/dashboard', title: 'Dashboard',  icon:'notifications', class: '' ,role: 4},

     { path: '/manager/manage-booking', title: 'Manage Booking',  icon:'notifications', class: '' ,role: 4},
     { path: '/manager/room-popularity', title: 'View Room Popularity',  icon:'notifications', class: '' ,role: 4},
     { path: '/manager/room-availability', title: 'View Room Availability',  icon:'notifications', class: '' ,role: 4},
     { path: '/manager/season-popularity', title: 'View Season Popularity',  icon:'notifications', class: '' ,role: 4},


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem.role == this.authService.getUserRole);


  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
