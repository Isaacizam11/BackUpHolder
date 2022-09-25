import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { AuthService } from 'app/auth/auth.service';
import { RoomService } from 'app/services/room.service';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  roomTypes: any[] = [];
  amenities: any[] = [];
  selectedAmenities: number[] = [];


  roomsAvailable: any = [];


  roomTypeId: number;
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });



  /** control for the selected bank for multi-selection */
  public amenitiesMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public amenitiesMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public $loader: BehaviorSubject<any> = new BehaviorSubject<boolean>(false)



  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private roomService: RoomService, private auth: AuthService) { }

  ngOnInit() {
    this.getAmenities();
    this.getRoomsTypes();
    this.amenitiesMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMulti();
      });
  }

  onSelect(evt) {
    this.roomTypeId = evt.value || null;
  }


  checkRoomAvailability(range: any, amenities: any[]) {
    let dataRange = this.range.value
    if (this.roomTypeId != null && dataRange.start != null && dataRange.end != null) {
      {
        const newRanger = {
          startDate: formatDate(new Date(dataRange.start), 'yyyy/MM/dd hh:mm:ss', 'en_US'),
          endDate: formatDate(new Date(dataRange.end), 'yyyy/MM/dd hh:mm:ss', 'en_US')
        };
        amenities = amenities.map(amenity => amenity.Id);
        this.$loader.next(true);
        this.roomService.checkRoomAvailability(this.roomTypeId, newRanger, amenities).subscribe(res => {
          if (res) {
            this.roomsAvailable = res;
            this.$loader.next(false);
          }
        })
      }
    }
  }
  Book(roomId) {
    let dataRange = this.range.value;
    const newRanger = {
      startDate: formatDate(new Date(dataRange.start), 'yyyy/MM/dd hh:mm:ss', 'en_US'),
      endDate: formatDate(new Date(dataRange.end), 'yyyy/MM/dd hh:mm:ss', 'en_US')
    };
    let book = {
      roomId: roomId,
      userId: this.auth.getUserID,
      ...newRanger
    }
    Swal.fire({
      title: 'Are you sure you want to book for',
      text: `${newRanger.startDate} - ${newRanger.endDate}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.roomService.bookRoom(book).subscribe((result) => {
          Swal.fire(
            'Booked!',
            'Room successfully booked.',
            'success'
          )

        }, error => {

        })

      }
    })
  }


  //function to get roomTypes
  getRoomsTypes() {
    this.roomService.getRoomsTypes().subscribe(res => {
      this.roomTypes = res;
    })
  }
  //function to get roomTypes
  getAmenities() {
    this.roomService.getAmenities().subscribe(res => {
      this.filteredMulti.next(res);

      this.amenities = res;
    })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected filterMulti() {
    if (!this.amenities) {
      return;
    }
    // get the search keyword
    let search = this.amenitiesMultiFilterCtrl.value;
    if (!search) {
      this.filteredMulti.next(this.amenities.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMulti.next(
      this.amenities.filter(bank => bank.Name.toLowerCase().indexOf(search) > -1)
    );
  }
}
