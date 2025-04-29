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


        [HttpPost]  // ѕост запрос успешно проходит, но результат не отображаетс€ на странице
        public IActionResult Index(HomeViewModel model)
        {
            model.person.calories = model.person.CalculateCalories();
            Console.WriteLine("пост прошел успешно");
            return View(model);
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
