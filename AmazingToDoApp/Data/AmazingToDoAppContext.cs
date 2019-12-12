using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmazingToDoApp.Data
{
    public class AmazingToDoAppContext : DbContext
    {
        public AmazingToDoAppContext(DbContextOptions<AmazingToDoAppContext> options)
            : base(options)
        {
        }

        public DbSet<AmazingToDoApp.Models.TaskItem> TaskItem { get; set; }
    }
}
