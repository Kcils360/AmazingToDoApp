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

        // GET: api/TaskItems/GetItems
        [HttpGet("[action]")]
        public IEnumerable<TaskItem> GetItems()
        {
            var list = _context.TaskItem.Select(task => task).ToList();
            return list;
        }

        // PUT: api/TaskItems/5/PutTaskItem
        [HttpPut("{id}/[action]")]
        public async Task<IActionResult> PutTaskItem([FromBody] TaskJson doObject)
        {
            if (doObject.id != doObject.task.ID)
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

        //TODO TEST THIS FEATURE!! THIS HAS NOT BEEN TESTED!!
        //PUT api/TaskItems/AddNewTask
        [HttpPut("[action]")]
        public async Task<IActionResult> AddNewTask([FromBody] TaskJson doObject)
        {
            if(doObject.task.TaskName == null)
            {
                return BadRequest();
            }
            //DONE linq code to add new
            _context.Add(doObject.task);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest();
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
        public TaskItem task { get; set; }
    }
}