using System.Collections.Generic;

namespace API.ViewModel
{
    public class CheckAvailabilityViewModel
    {
        public int typeId { get; set; }
        public System.DateTime startDate { get; set; }
        public System.DateTime endDate { get; set; }

        public List<int> amenities { get; set; }
    }
}