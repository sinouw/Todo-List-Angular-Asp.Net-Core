using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class TodoDetailsController : ControllerBase
    {
        private readonly TodoDetailContext _context;

        public TodoDetailsController(TodoDetailContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDetail>>> GetTodos()
        {
            var tods = _context.Todos.OrderBy(x => x.Completed);

            return await tods.ToListAsync();
        }

        // GET: api/todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDetail>> GetTodoDetail(int id)
        {
            var todoDetail = await _context.Todos.FindAsync(id);

            if (todoDetail == null)
            {
                return NotFound();
            }

            return todoDetail;
        }

        // PUT: api/todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoDetail(int id, TodoDetail todoDetail)
        {
            if (id != todoDetail.TodoId)
            {
                return BadRequest();
            }

            _context.Entry(todoDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoDetailExists(id))
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

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<TodoDetail>> PostTodoDetail(TodoDetail todoDetail)
        {
            _context.Todos.Add(todoDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoDetail", new { id = todoDetail.TodoId }, todoDetail);
        }

        // DELETE: api/todo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoDetail>> DeleteTodoDetail(int id)
        {
            var todoDetail = await _context.Todos.FindAsync(id);
            if (todoDetail == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todoDetail);
            await _context.SaveChangesAsync();

            return todoDetail;
        }

        //DELETE: api/todo
        [HttpDelete]
        public async Task DeleteAllTodos()
        {
            var todos = await _context.Todos.ToListAsync();
            _context.Todos.RemoveRange(todos);
            await _context.SaveChangesAsync();
        }

        private bool TodoDetailExists(int id)
        {
            return _context.Todos.Any(e => e.TodoId == id);
        }
    }
}
