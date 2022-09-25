using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/clerk")]
    public class ClerkController : GuestController
    {
        private UCTEntities db = new UCTEntities();


        [HttpGet]
        [Route("GetUsersBooked")]
        public List<UserViewModel> getUsersBooked()

        {
            db.Configuration.ProxyCreationEnabled = false;
            List<UserViewModel> list = new List<UserViewModel>();
            try
            {
                List<User> Users = db.Users.ToList();
                foreach (User user in Users)
                {
                    UserViewModel userBooked = getProfile(user.id);
                    if (userBooked.BookedRooms.Count() > 0)
                        list.Add(userBooked);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }


        [HttpPost]
        [Route("checkin/{id}")]
        public object checkin(int id)
        {
            try
            {
                Room_Booking booking = db.Room_Booking.Where(x => x.Id == id).FirstOrDefault();
                booking.isCheckedIn = true;
                /// db.Room_Booking.Add(booking);
                db.SaveChanges();

                return Ok();

            }
            catch (Exception c)
            {
                return c;
            }

        }

        [HttpPost]
        [Route("checkOut/{id}")]
        public object checkinOut(int id)
        {
            try
            {
                Room_Booking booking = db.Room_Booking.Where(x => x.Id == id).FirstOrDefault();
                booking.isCheckedIn = false;
                ///db.Room_Booking.Add(booking);
                db.SaveChanges();

                return Ok();

            }
            catch (Exception c)
            {
                return c;
            }

        }
    }
}
