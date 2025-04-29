using System.Diagnostics;
using DailyMealPlanner.Data;
using DailyMealPlanner.Models;
using Microsoft.AspNetCore.Mvc;

namespace DailyMealPlanner.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public JsonResult CalculateCalories([FromBody] Person person)
        {
            person.CalculateCalories();
            return Json(new { calories = person.calories });
        }


        public IActionResult Index()
        {
            HomeViewModel model = new HomeViewModel();
            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
