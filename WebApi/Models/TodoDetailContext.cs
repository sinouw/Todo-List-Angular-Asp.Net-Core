using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class TodoDetailContext : DbContext
    {

        public TodoDetailContext(DbContextOptions options) : base (options)
        {

        }

        public DbSet<TodoDetail> Todos { get; set; }

    }
}
