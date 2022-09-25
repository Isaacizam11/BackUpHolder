using System.Collections.Generic;

namespace API.ViewModel
{
    public class AvailableRoomViewModel
    {
        public int id { get; set; }
        public string roomName { get; set; }
        public string roomNumber { get; set; }

        public int roomTypeId { get; set; }
        public int numberOfAvailableRooms { get; set; }
        public decimal rate { get; set; }

        public List<string> Amenities { get; set; }
    }
}