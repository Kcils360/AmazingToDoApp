using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AmazingToDoApp.Data;
using AmazingToDoApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmazingToDoApp.Controllers
{
    [Route("api/[controller]")]
    public class TaskItemsController : ControllerBase
    {
        private readonly AmazingToDoAppContext _context;
        public TaskItemsController(AmazingToDoAppContext context)
        {
            _context = context;
        }

        // GET: api/TaskItems
        [HttpGet("[action]")]
        public IEnumerable<TaskItem> GetItems()
        {
            var list = _context.TaskItem.Select(task => task).ToList();
            return list;
        }

        // PUT: api/ToDoes/5
        [HttpPut("{id}/[action]")]
        public async Task<IActionResult> PutToDo([FromBody] TaskJson doObject)
        {
            if (doObject.id != doObject.task.Id)
            {
                return BadRequest();
            }
            //TODO - add linq query to make change to DB
            _context.Entry(doObject.task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(doObject.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.TaskItem.Any(e => e.ID == id);
        }

    }
    public class TaskJson
    {
        public int id { get; set; }
        public Task task { get; set; }
    }
}