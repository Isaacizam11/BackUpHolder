using System.Collections.Generic;

namespace API.ViewModel
{
    public class UserViewModel
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }

        public List<UserBookedRoomViewModel> BookedRooms { get; set; }

    }
}