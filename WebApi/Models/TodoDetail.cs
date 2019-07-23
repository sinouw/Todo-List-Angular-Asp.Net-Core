using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class TodoDetail
    {
        [Key]
        public int TodoId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        [Required]
        public string Title { get; set; }
        [Required]
        [Column(TypeName = "bit")]
        public bool Completed { get; set; } = false;
        [Required]
        [Column(TypeName = "nvarchar(10)")]
        public string OptimalLine { get; set; }

    }
}
