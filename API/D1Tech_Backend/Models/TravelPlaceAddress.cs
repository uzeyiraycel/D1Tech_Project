namespace D1Tech_Backend.Models
{
    public class TravelPlaceAddress
    {
        public Guid? Id { get; set; }
        public string? Address { get; set; }
        public Guid? TravelPlaceId { get; set; }
        public TravelPlace? TravelPlace { get; set; }
    }
}
