using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AmazingToDoApp.Data;
using AmazingToDoApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<TaskItem> GetToDos()
        {
            var list = _context.TaskItem.Select(task => task).ToList();
            return list;
        }
    }
}