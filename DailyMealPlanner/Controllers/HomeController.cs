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

        [HttpPost]
        public JsonResult ExportPlan([FromBody] MealService meals)
        {
            var result = new
            {
                Breakfast = meals.breakfast,
                Lunch = meals.lunch,
                Dinner = meals.dinner,
                Total = new
                {
                    Calories = meals.TotalDayCalories,
                    Protein = meals.TotalDayProtein,
                    Fats = meals.TotalDayFats,
                    Carbs = meals.TotalDayCarbs
                }
            };
            Console.WriteLine("Кол-во калорий в приеме пищи: " + result.Total.Calories);
            return Json(result);
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
