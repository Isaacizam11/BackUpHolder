using API.Models;
using System.Collections.Generic;

namespace API.ViewModel
{
    public class UserBookedRoomViewModel
    {
        public int bookId { get; set; }
        public int roomId { get; set; }
        public bool status { get; set; }


        public System.DateTime startDate { get; set; }
        public System.DateTime endDate { get; set; }
        public string roomName { get; set; }
        public string roomNumber { get; set; }
        public List<Amenity> amenities { get; set; }
    }
}