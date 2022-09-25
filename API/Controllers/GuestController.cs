using API.Models;
using API.ViewModel;
using Itenso.TimePeriod;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/booking")]
    public class GuestController : ApiController
    {
        private UCTEntities db = new UCTEntities();

        [HttpPost]
        [Route("check-availability/{id}")]
        public object checkAvailability(int id, [FromBody] CheckAvailabilityViewModel avail)
        {
            try
            {
                dynamic ToReturn = new ExpandoObject();

                List<Room_Booking> bookings = db.Room_Booking.Where(y => y.Room.typeId == avail.typeId).ToList();

                List<Amenity> amenities = db.Amenities.ToList();
                List<Room> rooms = db.Rooms.Where(x => x.typeId == avail.typeId).ToList(); ;

                List<AvailableRoomViewModel> availableRooms = new List<AvailableRoomViewModel>();

                TimeRange timeRange = new TimeRange(avail.startDate, avail.endDate);

                foreach (var booking in bookings)
                {
                    if (timeRange.HasInside(new TimeRange(booking.startDate, booking.endDate)) ||
                      timeRange.OverlapsWith(new TimeRange(booking.startDate, booking.endDate)) ||
                      timeRange.IntersectsWith(new TimeRange(booking.startDate, booking.endDate)) ||
                      timeRange.IsSamePeriod(new TimeRange(booking.startDate, booking.endDate)))
                    {
                        return Ok(availableRooms);
                    }
                }



                foreach (Room room in rooms)
                {

                    if (room.RoomType.RoomTypeAmenities.Count == avail.amenities.Count && room.availableRooms > 0)
                    {
                        var roomAmenities = room.RoomType.RoomTypeAmenities.Select(x => x.amenityId).OrderByDescending(x => x).ToList();
                        var requiredAmenties = avail.amenities.OrderByDescending(x => x).ToList();
                        var checker = requiredAmenties.SequenceEqual(roomAmenities);
                        if (checker)
                        {
                            List<string> Myamenities = new List<string>();
                            foreach (var amId in roomAmenities)
                            {
                                Myamenities.Add(amenities.Where(a => a.Id == amId).Select(x => x.Name).FirstOrDefault());
                            }

                            AvailableRoomViewModel availableRoomView = new AvailableRoomViewModel
                            {
                                id = room.id,
                                numberOfAvailableRooms = (int)room.availableRooms,
                                roomName = room.roomName,
                                roomTypeId = room.typeId,
                                Amenities = Myamenities,
                                rate = room.RoomType.rate
                            };
                            availableRooms.Add(availableRoomView);
                        }
                    }

                }
                return Ok(availableRooms);



            }
            catch (Exception c)
            {
                return c;
            }


        }

        //[HttpPost]
        //[Route("check-in")]
        //public object checkin([FromBody] CheckAvailabilityViewModel avail)
        //{

        //}

        [HttpPost]
        [Route("book")]
        public object book([FromBody] Room_Booking booking)
        {
            try
            {
                Room MyRoom = new Room();
                booking.isCheckedIn = false;
                db.Room_Booking.Add(booking);
                var save = db.SaveChanges();
                if (save != null)
                {
                    Room room = db.Rooms.Where(x => x.id == booking.roomId).FirstOrDefault();
                    MyRoom = room;
                    room.availableRooms -= 1;
                    db.SaveChanges();
                }
                return Ok(MyRoom);

            }
            catch (Exception c)
            {
                return c;
            }

        }

        [Route("cancelbooking")]
        public object cancelbooking([FromBody] CancelBookingViewModel canceled)
        {
            try
            {
                Room_Booking bookedRoom = db.Room_Booking.Where(x => x.Id == canceled.bookingId).FirstOrDefault();
                db.Room_Booking.Remove(bookedRoom);
                var save = db.SaveChanges();
                if (save != null)
                {
                    Room room = db.Rooms.Where(x => x.id == canceled.roomId).FirstOrDefault();
                    room.availableRooms += 1;
                    db.SaveChanges();
                }
                return Ok();

            }
            catch (Exception c)
            {
                return c;
            }

        }

        [HttpGet]
        [Route("GetAmenities")]
        public List<Amenity> getamenties()

        {
            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<Amenity> amenities = db.Amenities.ToList();

                return amenities;
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("GetProfile/{id}")]
        public UserViewModel getProfile(int id)

        {


            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                User user = db.Users.Where(x => x.id == id).FirstOrDefault();
                List<Room_Booking> userBookedRoomIdss = db.Room_Booking.Where(u => u.userId == id).ToList();
                List<UserBookedRoomViewModel> roomBookedList = new List<UserBookedRoomViewModel>();
                List<Amenity> amenitiesList = new List<Amenity>();

                foreach (Room_Booking booking in userBookedRoomIdss)
                {
                    Room room = db.Rooms.Where(x => x.id == booking.roomId).FirstOrDefault();
                    amenitiesList = db.RoomTypeAmenities.Where(x => x.roomTypeId == room.typeId).Select(s => s.Amenity).ToList();
                    UserBookedRoomViewModel userbookedRoom = new UserBookedRoomViewModel
                    {
                        roomId = room.id,
                        bookId = booking.Id,
                        roomName = room.roomName,
                        roomNumber = room.roomNumber,
                        amenities = amenitiesList,
                        startDate = booking.startDate,
                        endDate = booking.endDate,
                        status = booking.isCheckedIn
                    };
                    roomBookedList.Add(userbookedRoom);
                }

                UserViewModel userView = new UserViewModel
                {
                    FirstName = user.FirstName,
                    Surname = user.Surname,
                    BookedRooms = roomBookedList,
                    Username = user.Username,
                };

                return userView;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
