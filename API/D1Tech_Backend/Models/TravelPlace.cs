namespace D1Tech_Backend.Models
{
    public class TravelPlace
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public ICollection<TravelPlaceAddress>? Addresses { get; set; }
    }
}
