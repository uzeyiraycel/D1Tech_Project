using D1Tech_Backend.Data;
using D1Tech_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace D1Tech_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TravelPlacesController : ControllerBase
    {
        private readonly D1TechDbContext _context;

        public TravelPlacesController(D1TechDbContext context)
        {
            _context = context;
        }

        #region Travel Place CRUD

        [HttpPost("SaveTravel")]
        public async Task<ActionResult<Guid>> SaveTravel(TravelPlace travelPlace)
        {
            if (travelPlace.Id == null)
            {
                travelPlace.Id = Guid.NewGuid();
                _context.TravelPlaces.Add(travelPlace);
            }
            else
            {
                _context.Entry(travelPlace).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return travelPlace.Id;
        }

        [HttpGet("GetTravelPlaces")]
        public async Task<ActionResult<IEnumerable<TravelPlace>>> GetTravelPlaces()
        {
            return await _context.TravelPlaces.Include(tp => tp.Addresses).ToListAsync();
        }

        [HttpGet("GetTravel")]
        public async Task<ActionResult<TravelPlace>> GetTravel(Guid id)
        {
            var travelPlace = await _context.TravelPlaces.Include(tp => tp.Addresses).FirstOrDefaultAsync(tp => tp.Id == id);

            if (travelPlace == null)
            {
                return NotFound();
            }

            return travelPlace;
        }

        [HttpDelete("DeleteTravelPlace")]
        public async Task<IActionResult> DeleteTravelPlace(Guid id)
        {
            var travelPlace = await _context.TravelPlaces.FindAsync(id);
            if (travelPlace == null)
            {
                return NotFound();
            }

            _context.TravelPlaces.Remove(travelPlace);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Travel Place Address CRUD

        [HttpGet("GetTravelPlaceAddresses")]
        public async Task<ActionResult<IEnumerable<TravelPlaceAddress>>> GetTravelPlaceAddresses(Guid id)
        {
            return await _context.TravelPlaceAddresses.Where(a => a.TravelPlaceId == id).ToListAsync();
        }

        [HttpPost("SavePlaceAddress")]
        public async Task<ActionResult<Guid>> SavePlaceAddress(TravelPlaceAddress travelPlaceAddresses)
        {
            if (travelPlaceAddresses.Id == null)
            {
                travelPlaceAddresses.Id = Guid.NewGuid();
                _context.TravelPlaceAddresses.Add(travelPlaceAddresses);
            }
            else
            {
                _context.Entry(travelPlaceAddresses).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return travelPlaceAddresses.Id;
        }

        [HttpGet("GetTravelPlaceAddress")]
        public async Task<ActionResult<TravelPlaceAddress>> GetTravelPlaceAddress(Guid id)
        {
            var address = await _context.TravelPlaceAddresses.FirstOrDefaultAsync(a => a.TravelPlaceId == id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        [HttpDelete("DeleteTravelPlaceAddress")]
        public async Task<IActionResult> DeleteTravelPlaceAddress(Guid id)
        {
            var address = await _context.TravelPlaceAddresses.FirstOrDefaultAsync(a => a.TravelPlaceId == id);
            if (address == null)
            {
                return NotFound();
            }

            _context.TravelPlaceAddresses.Remove(address);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        

        #endregion
    }
}
